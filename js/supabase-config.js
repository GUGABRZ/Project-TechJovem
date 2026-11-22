/* =========================================================
   Conexão com o Supabase.
   A chave publishable pode ficar no site: ela só libera o que
   as regras de segurança (RLS) permitem. Nunca coloque a
   chave secreta (service_role) aqui.
   ========================================================= */
const TJ_SUPABASE_URL = "https://xarmrygvenzynshvqvyy.supabase.co";
const TJ_SUPABASE_KEY = "sb_publishable_Q8WWU8nWAMDtRmLs2DOfBg_7UQLunyR";

const tjDb = supabase.createClient(TJ_SUPABASE_URL, TJ_SUPABASE_KEY);
