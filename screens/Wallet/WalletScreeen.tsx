import { GlobalDialogModal, RazorpayModal, Topbar } from '@Component';
import tailwind from '@tailwind';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import assets_manifest from '@assets';
import { INDIAN } from '@constants/API_constants';

export default function WalletScreen() {
  const [activeTab, setActiveTab] = useState(1);
  const [open, setOpen] = useState(false);

  const tabs = [
    { name: 'Order History', id: 1 },
    { name: 'Wallet History', id: 2 },
  ];

  // Sample data - replace with actual data
  const orderHistory = [
    {
      id: 1,
      orderNo: '#ORD12345',
      date: '23 Jan 2026',
      amount: 450,
      status: 'Completed',
    },
    {
      id: 2,
      orderNo: '#ORD12344',
      date: '22 Jan 2026',
      amount: 320,
      status: 'Completed',
    },
    {
      id: 3,
      orderNo: '#ORD12343',
      date: '20 Jan 2026',
      amount: 890,
      status: 'Cancelled',
    },
  ];

  const walletHistory = [
    {
      id: 1,
      type: 'Credit',
      amount: 500,
      date: '23 Jan 2026',
      description: 'Refund for order #ORD12343',
    },
    {
      id: 2,
      type: 'Debit',
      amount: 200,
      date: '22 Jan 2026',
      description: 'Payment for order #ORD12344',
    },
    {
      id: 3,
      type: 'Credit',
      amount: 100,
      date: '20 Jan 2026',
      description: 'Cashback reward',
    },
  ];

  const renderOrderItem = ({ item }) => (
    <View style={styles.historyCard}>
      <View style={styles.historyHeader}>
        <View>
          <Text style={styles.orderNumber}>{item.orderNo}</Text>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
        <View style={styles.statusBadge}>
          <Text
            style={[
              styles.statusText,
              { color: item.status === 'Completed' ? '#10B981' : '#EF4444' },
            ]}
          >
            {item.status}
          </Text>
        </View>
      </View>
      <View style={styles.amountRow}>
        <Text style={styles.amountLabel}>Amount Paid</Text>
        <Text style={styles.amountValue}>
          {INDIAN} {item.amount}
        </Text>
      </View>
    </View>
  );

  const renderWalletItem = ({ item }) => (
    <View style={styles.historyCard}>
      <View style={styles.historyHeader}>
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionDescription}>{item.description}</Text>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
        <Text
          style={[
            styles.transactionAmount,
            { color: item.type === 'Credit' ? '#10B981' : '#EF4444' },
          ]}
        >
          {item.type === 'Credit' ? '+' : '-'}
          {INDIAN} {item.amount}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Topbar title="Wallet" type={3} />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Wallet Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceContent}>
            <Text style={styles.balanceLabel}>Available Balance</Text>
            <Text style={styles.balanceAmount}>{INDIAN} 500.00</Text>
            <Text style={styles.balanceSubtext}>Last updated: Today</Text>
          </View>

          <TouchableOpacity
            style={styles.payButton}
            onPress={() => {
              setOpen(true);
            }}
          >
            <Text style={styles.payButtonText}>Add Money</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                activeOpacity={0.7}
                onPress={() => setActiveTab(tab.id)}
                style={[styles.tabItem, isActive && styles.activeTabItem]}
              >
                <Text
                  style={[styles.tabText, isActive && styles.activeTabText]}
                >
                  {tab.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* History Content */}
        <View style={styles.historyContainer}>
          {activeTab === 1 ? (
            <FlatList
              data={orderHistory}
              renderItem={renderOrderItem}
              keyExtractor={item => item.id.toString()}
              scrollEnabled={false}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <Text style={styles.emptyIcon}>📦</Text>
                  <Text style={styles.emptyText}>No orders yet</Text>
                  <Text style={styles.emptySubtext}>
                    Start shopping to see your orders here
                  </Text>
                </View>
              }
            />
          ) : (
            <FlatList
              data={walletHistory}
              renderItem={renderWalletItem}
              keyExtractor={item => item.id.toString()}
              scrollEnabled={false}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <Text style={styles.emptyIcon}>💳</Text>
                  <Text style={styles.emptyText}>No transactions yet</Text>
                  <Text style={styles.emptySubtext}>
                    Your wallet transactions will appear here
                  </Text>
                </View>
              }
            />
          )}
          <View style={[tailwind('h-20')]} />
        </View>
      </ScrollView>
      <RazorpayModal visible={open} setVisible={setOpen}/>
       
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },

  // Balance Card
  balanceCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginTop: 20,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  balanceIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  balanceIcon: {
    fontSize: 30,
  },
  balanceContent: {
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
    fontWeight: '500',
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  balanceSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  payButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Quick Actions
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  actionIconText: {
    fontSize: 24,
    color: '#10B981',
  },
  actionText: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '600',
  },

  // Tabs
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTabItem: {
    backgroundColor: '#10B981',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#FFFFFF',
  },

  // History
  historyContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  amountLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  amountValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },

  // Wallet History Specific
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionIconText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 12,
  },
  transactionDescription: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});
