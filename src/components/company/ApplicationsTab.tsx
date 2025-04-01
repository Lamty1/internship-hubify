
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
import { toast } from "@/components/ui/use-toast";

interface ApplicationsTabProps {
  applications: any[];
}

const ApplicationsTab: React.FC<ApplicationsTabProps> = ({ applications }) => {
  const [open, setOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<any | null>(null);

  const handleOpen = (application: any) => {
    setSelectedApplication(application);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedApplication(null);
    setOpen(false);
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

  return (
    <>
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
              <TableCell className="font-medium">{application.internship.title}</TableCell>
              <TableCell>
                <Badge className={applicationStatusColors[application.status]}>
                  {application.status}
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
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
                  disabled
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
                  disabled
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Input
                  type="text"
                  id="status"
                  value={selectedApplication.status}
                  className="col-span-3"
                  disabled
                />
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
                  disabled
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="coverLetter" className="text-right">
                  Cover Letter
                </Label>
                <Textarea
                  id="coverLetter"
                  value={selectedApplication.coverLetter || "N/A"}
                  className="col-span-3"
                  disabled
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="resume" className="text-right">
                  Resume
                </Label>
                <a href={selectedApplication.resumeUrl} target="_blank" rel="noopener noreferrer">
                  View Resume
                </a>
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
