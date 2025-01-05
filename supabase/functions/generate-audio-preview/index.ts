import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting audio preview generation...");
    
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      console.error("No file uploaded");
      return new Response(
        JSON.stringify({ error: 'No file uploaded' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    console.log("File received:", file.name, "Type:", file.type);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Generate a unique filename for the preview
    const fileName = file.name.replace(/[^\x00-\x7F]/g, '');
    const fileExt = fileName.split('.').pop();
    const previewPath = `preview_${crypto.randomUUID()}.${fileExt}`;

    console.log("Uploading preview file to Supabase Storage...");

    // Upload the original file as preview (temporary solution until FFmpeg implementation)
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('temp_audio')
      .upload(previewPath, file, {
        contentType: file.type,
        upsert: false
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw uploadError;
    }

    console.log("Preview uploaded successfully");

    return new Response(
      JSON.stringify({
        previewPath: previewPath
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error) {
    console.error('Error generating preview:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate preview',
        details: error.message 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});