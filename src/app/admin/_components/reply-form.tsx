'use client';

import { useActionState, useState } from 'react';
import { CheckCircle2, Loader2, Reply, Send } from 'lucide-react';
import { sendAdminReply, type AdminReplyState } from '@/app/actions/admin-reply';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function ReplyForm({ to, defaultSubject }: { to: string; defaultSubject: string }) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState<AdminReplyState, FormData>(sendAdminReply, null);

  if (!open) {
    return (
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        <Reply className="size-3.5" />
        Reply
      </Button>
    );
  }

  if (state?.ok) {
    return (
      <div className="flex items-center gap-2 text-sm text-primary">
        <CheckCircle2 className="size-4" />
        Reply sent to {to}
      </div>
    );
  }

  return (
    <form action={formAction} className="w-full space-y-3 rounded-lg border border-border bg-background/50 p-4">
      <input type="hidden" name="to" value={to} />
      <div className="space-y-1.5">
        <Label htmlFor={`subject-${to}`} className="text-xs">
          Subject
        </Label>
        <Input id={`subject-${to}`} name="subject" defaultValue={defaultSubject} required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor={`body-${to}`} className="text-xs">
          Message
        </Label>
        <Textarea id={`body-${to}`} name="body" required rows={5} placeholder="Type your reply..." />
      </div>

      {state && !state.ok && <p className="text-sm text-destructive">{state.error}</p>}

      <div className="flex gap-2">
        <Button type="submit" size="sm" disabled={pending}>
          {pending ? <Loader2 className="size-3.5 animate-spin" /> : <Send className="size-3.5" />}
          Send Reply
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
