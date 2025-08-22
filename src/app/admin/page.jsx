'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getProducts, getServices, getOrders } from '@/lib/firebase-utils';
import { Package, Wrench, ShoppingCart, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    services: 0,
    orders: 0,
    pendingOrders: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [products, services, orders] = await Promise.all([
          getProducts(),
          getServices(),
          getOrders()
        ]);

        const pendingOrders = orders.filter(order => order.status === 'pending').length;

        setStats({
          products: products.length,
          services: services.length,
          orders: orders.length,
          pendingOrders
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Products',
      value: stats.products,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Services',
      value: stats.services,
      icon: Wrench,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Orders',
      value: stats.orders,
      icon: ShoppingCart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your admin dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? '...' : stat.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Add Product</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Create a new product listing</p>
            <Link href="/admin/products">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Manage Products
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Add Service</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Create a new service listing</p>
            <Link href="/admin/services">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Manage Services
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">View Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Manage customer orders</p>
            <Link href="/admin/orders">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                Manage Orders
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
