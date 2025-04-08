
import { useState } from 'react';
import { FileText as FileIcon, CheckCircle, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface NotificationsTabProps {
  userId: string;
  notifications?: any[];
  isLoading?: boolean;
}

const NotificationsTab = ({ userId, notifications = [], isLoading = false }: NotificationsTabProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [errorState, setErrorState] = useState<string | null>(null);

  // Get the proper user ID from database based on auth ID
  const { data: userRecord } = useQuery({
    queryKey: ['userRecord', userId],
    queryFn: async () => {
      if (!userId) return null;
      
      try {
        const { data, error } = await supabase
          .from('users')
          .select('id')
          .eq('auth_id', userId)
          .single();
          
        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Error fetching user record:', error);
        return null;
      }
    },
    enabled: !!userId,
  });

  // Create mutation for marking all notifications as read
  const markAllReadMutation = useMutation({
    mutationFn: async () => {
      if (!userRecord?.id) {
        throw new Error('User ID not found');
      }
      
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', userRecord.id)
        .eq('is_read', false);
        
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', userId] });
      toast({
        title: "Success",
        description: "All notifications marked as read",
      });
      setErrorState(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to mark notifications as read",
        variant: "destructive",
      });
      console.error("Error marking notifications as read:", error);
      setErrorState("Failed to mark notifications as read. Please try again.");
    },
  });

  const handleMarkAllAsRead = () => {
    markAllReadMutation.mutate();
  };

  // Create sample notifications if none exist
  const createSampleNotifications = async () => {
    if (!userRecord?.id) return;
    
    try {
      const { error } = await supabase
        .from('notifications')
        .insert([
          {
            user_id: userRecord.id,
            title: 'New application received',
            message: 'A student has applied for your Software Engineering internship',
            is_read: false
          },
          {
            user_id: userRecord.id,
            title: 'Profile update reminder',
            message: 'Please complete your company profile to attract more applicants',
            is_read: false
          },
          {
            user_id: userRecord.id,
            title: 'Internship application deadline approaching',
            message: 'Your internship application deadline is in 3 days',
            is_read: false
          }
        ]);
        
      if (error) throw error;
      
      queryClient.invalidateQueries({ queryKey: ['notifications', userId] });
      
      toast({
        title: "Sample notifications created",
        description: "Sample notifications have been added for demonstration",
      });
    } catch (error) {
      console.error('Error creating sample notifications:', error);
      toast({
        title: "Error",
        description: "Failed to create sample notifications",
        variant: "destructive",
      });
    }
  };

  // Format notification date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);
    const diffInDays = diffInHours / 24;

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else {
      return `${Math.floor(diffInDays)} days ago`;
    }
  };

  // Determine icon based on notification title
  const getNotificationIcon = (title: string) => {
    if (title.includes('application')) {
      return <FileIcon className="h-5 w-5 text-blue-600" />;
    } else if (title.includes('approved')) {
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    } else {
      return <Bell className="h-5 w-5 text-yellow-600" />;
    }
  };

  // Determine background color based on notification title
  const getNotificationBgColor = (title: string) => {
    if (title.includes('application')) {
      return 'bg-blue-100';
    } else if (title.includes('approved')) {
      return 'bg-green-100';
    } else {
      return 'bg-yellow-100';
    }
  };

  if (isLoading) {
    return <div className="p-6 text-center">Loading notifications...</div>;
  }

  if (errorState) {
    return (
      <div className="p-6 text-center text-red-600">
        <p>{errorState}</p>
        <Button 
          variant="outline" 
          onClick={() => window.location.reload()} 
          className="mt-4"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Recent Notifications</h2>
          <div className="flex gap-2">
            {notifications && notifications.length === 0 && (
              <Button variant="outline" onClick={createSampleNotifications}>
                Create Sample Notifications
              </Button>
            )}
            <Button 
              variant="outline" 
              onClick={handleMarkAllAsRead} 
              disabled={markAllReadMutation.isPending || !notifications || notifications.length === 0}
            >
              {markAllReadMutation.isPending ? 'Processing...' : 'Mark All as Read'}
            </Button>
          </div>
        </div>
        
        {notifications && notifications.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification: any) => (
              <div key={notification.id} className={`p-6 hover:bg-gray-50 flex items-start ${notification.is_read ? 'opacity-60' : ''}`}>
                <div className={`${getNotificationBgColor(notification.title)} p-2 rounded-full mr-4`}>
                  {getNotificationIcon(notification.title)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{formatDate(notification.created_at)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">
            No notifications to display
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsTab;
