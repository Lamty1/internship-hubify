
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { updateApplicationStatus } from "@/lib/api";

interface ApplicationsTabProps {
  applications: any[];
  isLoading?: boolean;
}

const ApplicationsTab: React.FC<ApplicationsTabProps> = ({ applications = [], isLoading = false }) => {
  const [open, setOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<any | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const handleOpen = (application: any) => {
    setSelectedApplication(application);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedApplication(null);
    setOpen(false);
  };

  const handleStatusUpdate = async (newStatus: string) => {
    if (!selectedApplication) return;
    
    setIsUpdating(true);
    try {
      await updateApplicationStatus(selectedApplication.id, newStatus);
      toast({
        title: "Status updated",
        description: `Application status updated to ${newStatus}`,
      });
      // Update the status locally
      setSelectedApplication({
        ...selectedApplication,
        status: newStatus
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const applicationStatusColors: { [key: string]: string } = {
    pending: "bg-gray-100 text-gray-800",
    reviewed: "bg-blue-100 text-blue-800",
    interviewed: "bg-yellow-100 text-yellow-800",
    accepted: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading applications...</div>;
  }

  if (applications.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">No Applications Yet</h2>
        <p className="text-gray-600">When students apply to your internships, their applications will appear here.</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((application) => (
              <TableRow key={application.id}>
                <TableCell className="font-medium">
                  {application.student.firstName} {application.student.lastName}
                </TableCell>
                <TableCell>{application.internship.title}</TableCell>
                <TableCell>
                  <Badge className={applicationStatusColors[application.status] || "bg-gray-100 text-gray-800"}>
                    {application.status || "pending"}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(application.submittedAt)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" onClick={() => handleOpen(application)}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>
              View all the details regarding this application.
            </DialogDescription>
          </DialogHeader>
          {selectedApplication && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  type="text"
                  id="name"
                  value={`${selectedApplication.student.firstName} ${selectedApplication.student.lastName}`}
                  className="col-span-3"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="position" className="text-right">
                  Position
                </Label>
                <Input
                  type="text"
                  id="position"
                  value={selectedApplication.internship.title}
                  className="col-span-3"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  Status
                </Label>
                <div className="col-span-3 flex flex-wrap gap-2">
                  <Badge className={applicationStatusColors[selectedApplication.status] || "bg-gray-100 text-gray-800"}>
                    {selectedApplication.status || "pending"}
                  </Badge>
                  <div className="w-full h-2"></div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleStatusUpdate('reviewed')}
                    disabled={isUpdating || selectedApplication.status === 'reviewed'}
                  >
                    Mark as Reviewed
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleStatusUpdate('interviewed')}
                    disabled={isUpdating || selectedApplication.status === 'interviewed'}
                  >
                    Mark as Interviewed
                  </Button>
                  <Button 
                    size="sm" 
                    variant="default" 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleStatusUpdate('accepted')}
                    disabled={isUpdating || selectedApplication.status === 'accepted'}
                  >
                    Accept
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive" 
                    onClick={() => handleStatusUpdate('rejected')}
                    disabled={isUpdating || selectedApplication.status === 'rejected'}
                  >
                    Reject
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input
                  type="text"
                  id="date"
                  value={formatDate(selectedApplication.submittedAt)}
                  className="col-span-3"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="coverLetter" className="text-right mt-2">
                  Cover Letter
                </Label>
                <Textarea
                  id="coverLetter"
                  value={selectedApplication.coverLetter || "No cover letter provided"}
                  className="col-span-3"
                  readOnly
                  rows={5}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="resume" className="text-right">
                  Resume
                </Label>
                <div className="col-span-3">
                  {selectedApplication.resumeUrl ? (
                    <a 
                      href={selectedApplication.resumeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      View Resume
                    </a>
                  ) : (
                    <span className="text-gray-500">No resume provided</span>
                  )}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ApplicationsTab;
