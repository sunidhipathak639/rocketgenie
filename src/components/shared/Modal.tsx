'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EnquireForm } from "@/components/forms/EnquireForm";

export const EnquireModal = ({ businessId, businessName }: { businessId: string, businessName: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Enquire Now</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enquire with {businessName}</DialogTitle>
        </DialogHeader>
        <EnquireForm businessId={businessId} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
