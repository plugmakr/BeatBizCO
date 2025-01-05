import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // First, get the user ID for seth@audicode.com
    const { data: { user }, error: userError } = await supabaseClient.auth.admin.getUserByEmail('seth@audicode.com')
    
    if (userError || !user) {
      throw new Error('User not found')
    }

    // Update the profile with admin role
    const { data: userData, error: updateError } = await supabaseClient
      .from('profiles')
      .update({ role: 'admin' })
      .eq('id', user.id)
      .select()

    if (updateError) throw updateError

    console.log('Successfully updated role to admin for seth@audicode.com')

    return new Response(
      JSON.stringify({ message: 'Role updated successfully', data: userData }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error updating admin role:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})