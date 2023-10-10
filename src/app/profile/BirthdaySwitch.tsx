'use client';
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useRouter } from 'next/navigation';

interface BirthdaySwitchProps {
  defaultValue: boolean;
}

export const BirthdaySwitch = ({ defaultValue }: BirthdaySwitchProps) => {
  const [check, setCheck] = useState(defaultValue);
  const router = useRouter();
  const handleClick = async () => {
    try {
      const res = await fetch(`/api/users/edit/showBirthday`, {
        method: 'PUT',
        body: JSON.stringify(check),
      });
      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='flex items-center space-x-2'>
      <Switch
        onClick={handleClick}
        checked={check}
        onCheckedChange={setCheck}
        id='airplane-mode'
      />
      <Label htmlFor='airplane-mode' className='text-muted-foreground'>
        show onother users your birthday ?
      </Label>
    </div>
  );
};
