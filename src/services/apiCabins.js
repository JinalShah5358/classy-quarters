import supabase from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Cabin can't be load");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Cabin can't be deleted");
  }

  return data;
}
export async function createCabin(newCabin) {
  const { data, error } = await supabase.from("cabins").insert([newCabin]);
  if (error) {
    console.log(error);
    throw new Error("Cabin can't be created");
  }
  return data;
}
