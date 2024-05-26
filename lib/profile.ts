import { supabase } from "@/lib/supabase";

export const getProfile = async (userId: string) => {
  console.log(userId);
  const { data, error } = await supabase
    .from("profile")
    .select()
    .eq("username", "Emma");
  if (error) throw error;
  console.log(data);
  return data;
};
