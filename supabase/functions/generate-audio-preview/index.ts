import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return new Response(
        JSON.stringify({ error: 'No file uploaded' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Generate a unique filename for the preview
    const fileName = file.name.replace(/[^\x00-\x7F]/g, '');
    const fileExt = fileName.split('.').pop();
    const previewPath = `preview_${crypto.randomUUID()}.${fileExt}`;

    // Upload the original file to temp storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('temp_audio')
      .upload(previewPath, file, {
        contentType: file.type,
        upsert: false
      });

    if (uploadError) {
      throw uploadError;
    }

    // Get a signed URL for the uploaded file
    const { data: urlData, error: urlError } = await supabase.storage
      .from('temp_audio')
      .createSignedUrl(previewPath, 3600);

    if (urlError) {
      throw urlError;
    }

    // TODO: Implement audio trimming logic here
    // For now, we'll just return the original file URL
    // In a real implementation, you would:
    // 1. Download the file
    // 2. Use ffmpeg or similar to create a 30-second preview
    // 3. Upload the preview file
    // 4. Delete the temporary files

    return new Response(
      JSON.stringify({
        previewUrl: urlData.signedUrl,
        previewPath: previewPath
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error('Error generating preview:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate preview' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});