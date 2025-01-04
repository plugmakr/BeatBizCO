import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import { decode as base64Decode } from "https://deno.land/std@0.140.0/encoding/base64.ts";

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

    // Create a temporary file from the uploaded data
    const tempFilePath = await Deno.makeTempFile();
    const arrayBuffer = await file.arrayBuffer();
    await Deno.writeFile(tempFilePath, new Uint8Array(arrayBuffer));

    // Create output file path
    const outputPath = await Deno.makeTempFile({ suffix: `.${fileExt}` });

    try {
      // Use ffmpeg to create a 30-second preview
      const ffmpeg = new Deno.Command("ffmpeg", {
        args: [
          "-i", tempFilePath,
          "-t", "30",
          "-acodec", "libmp3lame",
          "-b:a", "192k",
          outputPath
        ]
      });

      const { success } = await ffmpeg.output();

      if (!success) {
        throw new Error("Failed to generate preview");
      }

      // Read the preview file
      const previewFile = await Deno.readFile(outputPath);

      // Upload the preview to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('temp_audio')
        .upload(previewPath, previewFile, {
          contentType: file.type,
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      // Clean up temporary files
      await Deno.remove(tempFilePath);
      await Deno.remove(outputPath);

      return new Response(
        JSON.stringify({
          previewPath: previewPath
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    } catch (error) {
      console.error('Error processing audio:', error);
      // Clean up temporary files in case of error
      try {
        await Deno.remove(tempFilePath);
        await Deno.remove(outputPath);
      } catch {
        // Ignore cleanup errors
      }
      throw error;
    }
  } catch (error) {
    console.error('Error generating preview:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate preview' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});