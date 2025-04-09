
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface SampleDataGeneratorProps {
  companyId: string | undefined;
  userId: string | undefined;
  shouldGenerateInternship: boolean;
}

const SampleDataGenerator = ({ companyId, userId, shouldGenerateInternship }: SampleDataGeneratorProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isGenerating, setIsGenerating] = useState(false);

  const createSampleInternship = async () => {
    if (!companyId) return;
    setIsGenerating(true);
    
    try {
      // Only create sample data if there are no internships
      const { error } = await supabase
        .from("internships")
        .insert([
          {
            company_id: companyId,
            title: "Sample Software Engineering Internship",
            location: "Remote",
            type: "Full-time",
            start_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            end_date: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString(),
            application_deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
            salary: "1000-1500 USD/month",
            description: "This is a sample internship for testing purposes.",
            responsibilities: ["Code development", "Testing", "Documentation"],
            requirements: ["JavaScript knowledge", "React experience"],
            skills: ["JavaScript", "React", "Node.js"],
            positions: 2,
            status: "active"
          }
        ]);
        
      if (error) {
        console.error("Error creating sample internship:", error);
        toast({
          title: "Error",
          description: "Failed to create sample internship",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Success",
          description: "Sample internship created successfully",
        });
        queryClient.invalidateQueries({ queryKey: ["company", userId] });
      }
    } catch (err) {
      console.error("Error in createSampleInternship:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!shouldGenerateInternship) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Get Started</h2>
      <p className="text-gray-600 mb-4">
        You don't have any internships yet. Create a sample internship to see how the dashboard works.
      </p>
      <Button 
        onClick={createSampleInternship}
        disabled={isGenerating}
      >
        {isGenerating ? "Creating..." : "Create Sample Internship"}
      </Button>
    </div>
  );
};

export default SampleDataGenerator;
