import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { WebView } from "react-native-webview";
import { loadEnabledShops } from "../shops/loadShops";

export function SearchScreen() {
  const shops = useMemo(() => loadEnabledShops(), []);

  const [queryInput, setQueryInput] = useState("");
  const [query, setQuery] = useState("");
  const [selectedShopId, setSelectedShopId] = useState(shops[0]?.id ?? "");
  const [isLoading, setIsLoading] = useState(false);

  const selectedShop = shops.find((s) => s.id === selectedShopId) ?? shops[0];
  const url = query ? selectedShop.buildSearchUrl(query) : selectedShop.homeUrl;

  const onSubmit = () => {
    const next = queryInput.trim();
    if (!next) return;
    Keyboard.dismiss();
    setQuery(next);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Multi-shop search</Text>

        <View style={styles.searchRow}>
          <TextInput
            value={queryInput}
            onChangeText={setQueryInput}
            placeholder="Search for an item…"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            onSubmitEditing={onSubmit}
            style={styles.input}
          />
          <Pressable style={styles.searchButton} onPress={onSubmit}>
            <Text style={styles.searchButtonText}>Search</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabs}
        >
          {shops.map((shop) => {
            const active = shop.id === selectedShopId;
            return (
              <Pressable
                key={shop.id}
                onPress={() => setSelectedShopId(shop.id)}
                style={[styles.tab, active ? styles.tabActive : styles.tabInactive]}
              >
                <Text style={[styles.tabText, active ? styles.tabTextActive : styles.tabTextInactive]}>
                  {shop.name}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.webContainer}>
          {isLoading ? (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator />
              <Text style={styles.loadingText}>Loading…</Text>
            </View>
          ) : null}

          <WebView
            key={`${selectedShop.id}:${url}`}
            source={{ uri: url }}
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() => setIsLoading(false)}
            startInLoadingState
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#0B1220" },
  container: { flex: 1, paddingHorizontal: 14, paddingTop: 10, gap: 10 },
  title: { color: "#F9FAFB", fontSize: 22, fontWeight: "700" },
  searchRow: { flexDirection: "row", gap: 10, alignItems: "center" },
  input: {
    flex: 1,
    backgroundColor: "#111827",
    color: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#1F2937",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  searchButton: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12
  },
  searchButtonText: { color: "#FFFFFF", fontWeight: "700" },
  tabs: { gap: 8, paddingVertical: 2 },
  tab: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999 },
  tabActive: { backgroundColor: "#1D4ED8" },
  tabInactive: { backgroundColor: "#111827", borderWidth: 1, borderColor: "#1F2937" },
  tabText: { fontSize: 13, fontWeight: "600" },
  tabTextActive: { color: "#FFFFFF" },
  tabTextInactive: { color: "#E5E7EB" },
  webContainer: {
    flex: 1,
    overflow: "hidden",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#1F2937",
    backgroundColor: "#0B1220"
  },
  loadingOverlay: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(17,24,39,0.9)",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  loadingText: { color: "#E5E7EB", fontSize: 12, fontWeight: "600" }
});

