
import { useState, useEffect } from 'react';
import { FileText as FileIcon, CheckCircle, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getNotificationsByUser, markAllNotificationsAsRead } from '@/lib/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

interface NotificationsTabProps {
  userId: string;
}

const NotificationsTab = ({ userId }: NotificationsTabProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch notifications from database
  const { data: notifications, isLoading, error } = useQuery({
    queryKey: ['notifications', userId],
    queryFn: () => getNotificationsByUser(userId),
    enabled: !!userId,
  });

  // Create mutation for marking all notifications as read
  const markAllReadMutation = useMutation({
    mutationFn: () => markAllNotificationsAsRead(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', userId] });
      toast({
        title: "Success",
        description: "All notifications marked as read",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to mark notifications as read",
        variant: "destructive",
      });
      console.error("Error marking notifications as read:", error);
    },
  });

  const handleMarkAllAsRead = () => {
    markAllReadMutation.mutate();
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

  if (error) {
    return <div className="p-6 text-center text-red-500">Error loading notifications</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Recent Notifications</h2>
          <Button variant="outline" onClick={handleMarkAllAsRead} disabled={markAllReadMutation.isPending}>
            {markAllReadMutation.isPending ? 'Processing...' : 'Mark All as Read'}
          </Button>
        </div>
        
        {notifications && notifications.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification: any) => (
              <div key={notification.id} className={`p-6 hover:bg-gray-50 flex items-start ${notification.isRead ? 'opacity-60' : ''}`}>
                <div className={`${getNotificationBgColor(notification.title)} p-2 rounded-full mr-4`}>
                  {getNotificationIcon(notification.title)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{formatDate(notification.createdAt)}</p>
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
