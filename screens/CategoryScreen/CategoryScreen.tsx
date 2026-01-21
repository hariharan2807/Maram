import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Topbar } from '@Component';
import assets_manifest from '@assets';
import { ExtraProductIcon, SubscriptionIcon1 } from '../../assets/icons';
import tailwind from '@tailwind';
import { useRoute } from '@react-navigation/native';

export default function CategoryScreen() {
  const route = useRoute();
  const [activeTab, setActiveTab] = useState(route?.params?.items?.category_id);

  const Category = [
    {
      category_image: assets_manifest?.SubSction,
      category_name: 'Subscription Product',
      category_id: 1,
    },
    {
      category_image: assets_manifest?.Addon,
      category_name: 'Add On Product',
      category_id: 2,
    },
  ];

  return (
    <View style={styles.container}>
      <Topbar title="Category" type={3} />

      {/* CATEGORY TABS */}
      <View style={styles.tabContainer}>
        {Category.map(item => {
          const isActive = activeTab === item.category_id;

          return (
            <TouchableOpacity
              key={item.category_id}
              activeOpacity={0.8}
              onPress={() => setActiveTab(item.category_id)}
              style={styles.tabItem}
            >
              <View style={[tailwind('my-3')]}>
                {item.category_id == 1 ? (
                  <SubscriptionIcon1 />
                ) : (
                  <ExtraProductIcon />
                )}
              </View>

              {/* <Image
                source={item.category_image}
                style={[
                  styles.icon,
                  { tintColor: isActive ? '#F39F3E' : '#9CA3AF' },
                ]}
                resizeMode="contain"
              /> */}

              <Text
                style={[
                  styles.tabText,
                  { color: isActive ? '#111827' : '#6B7280' },
                ]}
              >
                {item.category_name}
              </Text>

              {isActive && <View style={styles.activeLine} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },

  tabItem: {
    width: '48%',
    alignItems: 'center',
    // paddingVertical: 12,
  },

  icon: {
    width: 32,
    height: 32,
    marginBottom: 6,
  },

  tabText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },

  activeLine: {
    marginTop: 8,
    height: 3,
    width: '60%',
    backgroundColor: '#F39F3E',
    borderRadius: 2,
  },
});
