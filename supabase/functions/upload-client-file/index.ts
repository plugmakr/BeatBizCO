import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Starting file upload process...');
    
    const formData = await req.formData()
    const file = formData.get('file')
    const clientId = formData.get('clientId')

    if (!file || !clientId) {
      console.error('Missing required fields:', { file: !!file, clientId: !!clientId });
      return new Response(
        JSON.stringify({ error: 'Missing file or client ID' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    console.log('File details:', {
      name: (file as File).name,
      type: (file as File).type,
      size: (file as File).size
    });

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Sanitize filename and generate unique path
    const fileName = (file as File).name.replace(/[^\x00-\x7F]/g, '')
    const fileExt = fileName.split('.').pop()
    const filePath = `${clientId}/${crypto.randomUUID()}.${fileExt}`

    console.log('Attempting to upload file to storage:', { filePath });

    // Upload file to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('client_files')
      .upload(filePath, file, {
        contentType: (file as File).type,
        upsert: false
      })

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      return new Response(
        JSON.stringify({ error: 'Failed to upload file to storage' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    console.log('File uploaded successfully to storage, saving metadata to database');

    // Save file metadata to database
    const { error: dbError } = await supabase
      .from('client_files')
      .insert({
        client_id: clientId,
        filename: fileName,
        file_path: filePath,
        file_type: (file as File).type,
        size: (file as File).size,
      })

    if (dbError) {
      console.error('Database error:', dbError);
      return new Response(
        JSON.stringify({ error: 'Failed to save file metadata' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    console.log('File upload process completed successfully');

    return new Response(
      JSON.stringify({ 
        message: 'File uploaded successfully',
        filePath,
        fileName 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})