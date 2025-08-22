import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Package, 
  Wrench, 
  ShoppingCart, 
  LogOut,
  Home
} from 'lucide-react';

export default function AdminSidebar({ onLogout }) {
  const pathname = usePathname();

  const menuItems = [
    {
      href: '/admin',
      label: 'Dashboard',
      icon: LayoutDashboard
    },
    {
      href: '/admin/products',
      label: 'Products',
      icon: Package
    },
    {
      href: '/admin/services',
      label: 'Services',
      icon: Wrench
    },
    {
      href: '/admin/orders',
      label: 'Orders',
      icon: ShoppingCart
    }
  ];

  return (
    <div className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-xl font-bold mb-8">Admin Panel</h1>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    isActive 
                      ? "bg-blue-600 text-white" 
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>
        
        <div className="mt-8 pt-8 border-t border-gray-700">
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800">
              <Home className="mr-3 h-5 w-5" />
              View Site
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 mt-2"
            onClick={onLogout}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
