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

    console.log("Creating temporary files...");

    // Create a temporary file from the uploaded data
    const tempFilePath = await Deno.makeTempFile();
    const arrayBuffer = await file.arrayBuffer();
    await Deno.writeFile(tempFilePath, new Uint8Array(arrayBuffer));

    // Create output file path
    const outputPath = await Deno.makeTempFile({ suffix: `.${fileExt}` });

    console.log("Temporary files created. Input:", tempFilePath, "Output:", outputPath);

    try {
      console.log("Starting ffmpeg process...");
      
      // Check if ffmpeg is available
      try {
        const ffmpegCheck = new Deno.Command("ffmpeg", { args: ["-version"] });
        const { success: ffmpegAvailable } = await ffmpegCheck.output();
        
        if (!ffmpegAvailable) {
          throw new Error("FFmpeg not available");
        }
        
        console.log("FFmpeg is available");
      } catch (error) {
        console.error("FFmpeg check failed:", error);
        throw new Error("FFmpeg not available");
      }

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

      console.log("Running FFmpeg command...");
      const { success, stdout, stderr } = await ffmpeg.output();
      console.log("FFmpeg output:", new TextDecoder().decode(stdout));
      console.log("FFmpeg errors:", new TextDecoder().decode(stderr));

      if (!success) {
        throw new Error("Failed to generate preview");
      }

      console.log("Preview generated successfully");

      // Read the preview file
      const previewFile = await Deno.readFile(outputPath);

      console.log("Uploading preview to Supabase Storage...");

      // Upload the preview to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('temp_audio')
        .upload(previewPath, previewFile, {
          contentType: file.type,
          upsert: false
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        throw uploadError;
      }

      console.log("Preview uploaded successfully");

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
      } catch (cleanupError) {
        console.error('Error cleaning up:', cleanupError);
      }
      throw error;
    }
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