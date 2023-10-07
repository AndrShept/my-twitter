'use client';
import { BackArrow } from '@/components/BackArrow';
import { User } from '@prisma/client';
import React from 'react';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { ProfileImageUpload } from '@/components/ProfileImageUpload';
import { ImageUpload } from '@/components/ImageUpload';
import { useSession } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const editUserSchema = z.object({
  username: z.string().min(3).max(20),
  image: z.string().optional().or(z.literal('')),
  profileImage: z.string().optional().or(z.literal('')),
  birthDay: z.string().min(2).max(2).optional().or(z.literal('')),
  birthMonth: z.string().min(2).max(2).optional().or(z.literal('')),
  birthYear: z.string().min(2).max(4).optional().or(z.literal('')),
  bio: z.string().min(4).max(255).optional().or(z.literal('')),
  location: z.string().min(4).max(40).optional().or(z.literal('')),
  website: z.string().url().optional().or(z.literal('')),
});

export const EditForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const {toast} = useToast();
  const initialData = {
    username: user!.username || undefined,
    image: user!.image || undefined,
    profileImage: user!.profileImage || undefined,
    birthDay: user!.birthDay || undefined,
    birthMonth: user!.birthMonth || undefined,
    birthYear: user!.birthYear || undefined,
    bio: user!.bio || undefined,
    location: user!.location || undefined,
    website: user!.website || undefined,
  };
  const form = useForm<z.infer<typeof editUserSchema>>({
    resolver: zodResolver(editUserSchema),
    defaultValues: initialData || {
      username: '',
      image: '',
      profileImage: '',
      birthDay: '',
      birthMonth: '',
      birthYear: '',
      bio: '',
      location: '',
      website: '',
    },
  });
  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof editUserSchema>) {
    try {
      const res = await fetch('/api/users/edit', {
        method: 'PUT',
        body: JSON.stringify(values),
      });
      if (res.ok) {
        form.reset();
        router.push(`/profile/${session?.user.name}/${session?.user.id}`);
        toast({
          title: 'update success',
        });
      }
      if (!res.ok) {
        toast({
          title: 'Something went wrong',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className='sticky  top-0 z-50 p-2 flex items-center bg-background/80 gap-2 border-b border-border backdrop-blur-md '>
        <div className=' flex items-center justify-center  '>
          <BackArrow />
        </div>
        <div>
          <h2 className='text-xl text-primary font-semibold leading-none'>
            {user?.name}
          </h2>
          <span className='text-muted-foreground text-sm'>Edit Profile</span>
        </div>
      </div>

      {/*      ----------------- ----------------- -----------------------------------------------------------------------------   */}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=' space-y-6 '>
          <div className='w-full'>
            {/*  IMAGE  FORM*/}
            <FormField
              name='profileImage'
              render={({ field }) => (
                <FormItem className=' '>
                  <FormControl>
                    <ProfileImageUpload
                      disabled={isLoading}
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='image'
              render={({ field }) => (
                <FormItem className=' '>
                  <FormControl>
                    <ImageUpload
                      disabled={isLoading}
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*   IMAGE  FORM* */}
          </div>
          <div className='p-3 space-y-5 '>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='' {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=' grid sm:grid-cols-2 grid-cols-1  gap-x-4 '>
              <FormField
                control={form.control}
                name='location'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                    <FormDescription>Your location</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='website'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input placeholder='https://example.com' {...field} />
                    </FormControl>
                    <FormDescription>Your website</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex gap-2'>
              <FormField
                control={form.control}
                name='birthDay'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Day</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                    <FormDescription>XX.10.1900</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='birthMonth'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Month</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                    <FormDescription>30.XX.1900</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='birthYear'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                    <FormDescription>30.10.XXXX</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='bio'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea className='' placeholder='' {...field} />
                  </FormControl>
                  <FormDescription>
                    Tell something about yourself
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex items-center   place-content-end gap-x-2'>
              {isLoading && <Loader2 size={27} className='animate-spin' />}
              <Button
                disabled={isLoading}
                className='rounded-full  '
                type='submit'
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
