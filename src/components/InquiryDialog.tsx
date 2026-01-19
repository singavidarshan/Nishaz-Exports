import { useState } from 'react';
import { Send } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface InquiryDialogProps {
  productName: string;
  children: React.ReactNode;
}

const InquiryDialog = ({ productName, children }: InquiryDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call for now
    setTimeout(() => {
      toast({
        title: "Inquiry Sent!",
        description: `Your inquiry for ${productName} has been sent. We'll contact you soon.`,
      });
      setFormData({ name: '', email: '' });
      setOpen(false);
      setLoading(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="w-5 h-5 text-primary" />
            Send Inquiry
          </DialogTitle>
          <DialogDescription>
            Send an inquiry about <strong>{productName}</strong>. We'll get back to you within 24 hours.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="inquiry-name">Your Name</Label>
            <Input
              id="inquiry-name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div>
            <Label htmlFor="inquiry-email">Your Email</Label>
            <Input
              id="inquiry-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Enter your email address"
              required
            />
          </div>
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Message preview:</strong> A customer ({formData.name || 'Customer'}) is interested in {productName}. Please get in touch at {formData.email || 'their email'}.
            </p>
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1"
            >
              {loading ? 'Sending...' : 'Send Inquiry'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InquiryDialog;