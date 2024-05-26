import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { StyleSheet, View, Alert, Text, Pressable } from "react-native";
import { Button, Input } from "@rneui/themed";
import { Session } from "@supabase/supabase-js";
import { ThemedText } from "./ThemedText";
import { getProfile } from "@/lib/profile";
import { parseDateDDMMYYYY } from "@/lib/parse-date";

export default function Account({ session }: { session: Session }) {
  const [username, setUsername] = useState("");
  const [date, setDate] = useState(new Date());
  console.log();
  //   getProfile(session.user.id);
  const getProfile = async () => {
    console.log(session.user.id);
    const { data, error } = await supabase
      .from("profile")
      .select("username")
      .eq("uid", session.user.id);
    if (error) throw error;
    console.log(data[0].username);
    setUsername(data[0].username);
  };
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <View>
      <View style={styles.header}>
        <ThemedText type="subtitle">
          {parseDateDDMMYYYY(String(date))}
        </ThemedText>

        <Text>Bonjour {username}</Text>

        <Pressable
          onPress={() => {
            supabase.auth.signOut();
          }}
        >
          <Text
            style={{
              marginTop: 20,
            }}
          >
            Log out
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: "15%",
    paddingBottom: "5%",
    paddingHorizontal: "5%",
    display: "flex",
    justifyContent: "center",
  },
});
