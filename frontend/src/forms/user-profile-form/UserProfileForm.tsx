import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import LoadingButton from "@/components/LoadingButton";
import { User } from "src/types";

const formSchema = z.object({
  email: z.string().optional(),
  //fullname: z.string().min(1, "name is required"),
  name_as_it_appear_in_passport: z
    .string()
    .min(1, "Name as it appear in passport is required"),
  gender: z.string().min(1, "Gender is required"),
  address: z.string().min(1, "Address Line 1 is required"),
  data_of_birth: z.string().min(1, " Data of Birth is required"),
  zip_postal_code: z.string().min(1, "ZIP Postal Code is required"),
  passport_number: z.string().min(1, "Passport Number is required"),
  passport_issued_date: z.string().min(1, "Passport Issued date is required"),

  passport_expiration_date: z
    .string()
    .min(1, "Passport Expiration date is required"),
  nationality: z.string().min(1, "Nationality is required"),
  current_job: z.string().min(1, "Current Job is required"),
  phone_numbers: z.string().min(1, "Phone Numbers is required"),
  emergency_contact: z.string().min(1, "Emergency Contact is required"),
  skills_details: z.string().min(1, "Skills Details is required"),
  experience_details: z.string().min(1, "Experience Details is required"),
  previous_un_missions: z.string().min(1, "Previous Un Missions is required"),
});

export type UserFormData = z.infer<typeof formSchema>;

type Props = {
  currentUser: User;
  onSave: (userProfileData: UserFormData) => void;
  isLoading: boolean;
};

const UserProfileForm = ({ onSave, isLoading, currentUser }: Props) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: currentUser,
  });

  useEffect(() => {
    form.reset(currentUser);
  }, [currentUser, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)}
        className="space-y-4 bg-[#133355] rounded-2xl p-4 md:p-10 w-full md:w-2/3 lg:w-3/4 xl:w-3/4 mx-auto"
      >
        <div>
          <h2 className=" text-white text-2xl font-bold"> User Profile Form</h2>
          <FormDescription className="text-white">
            View and change your profile information here
          </FormDescription>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-white">Email</FormLabel>
              <FormControl>
                <Input {...field} disabled className="bg-white" />
              </FormControl>
            </FormItem>
          )}
        />

<FormField
  control={form.control}
  name="name_as_it_appear_in_passport"
  render={({ field }) => (
    <FormItem className="flex-1">
      <FormLabel className="text-white">
        Name (as it appear in passport)
        <span style={{ color: "red", marginLeft: "5px" }}>*</span>
      </FormLabel>
      <FormControl>
        <Input {...field} className="bg-white" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
<FormField
  control={form.control}
  name="gender"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="text-white">
        Gender
        <span style={{ color: "red", marginLeft: "5px" }}>*</span>
      </FormLabel>
      <FormControl>
        <Input {...field} className="bg-white" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
<FormField
  control={form.control}
  name="address"
  render={({ field }) => (
    <FormItem className="flex-1">
      <FormLabel className="text-white">
        Address
        <span style={{ color: "red", marginLeft: "5px" }}>*</span>
      </FormLabel>
      <FormControl>
        <Input {...field} className="bg-white" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>






        <FormField
          control={form.control}
          name="data_of_birth"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className=" text-white">Data of Birth   <span style={{ color: "red", marginLeft: "5px" }}>*</span> </FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zip_postal_code"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className=" text-white">ZIP Postal Code   <span style={{ color: "red", marginLeft: "5px" }}>*</span> </FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passport_number"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className=" text-white">Passport Number   <span style={{ color: "red", marginLeft: "5px" }}>*</span> </FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passport_issued_date"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className=" text-white">
                Passport Issued date
                <span style={{ color: "red", marginLeft: "5px" }}>*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="passport_expiration_date"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className=" text-white">
                Passport Expiration date
                <span style={{ color: "red", marginLeft: "5px" }}>*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nationality"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className=" text-white">Nationality  <span style={{ color: "red", marginLeft: "5px" }}>*</span></FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="current_job"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className=" text-white">Current Job  <span style={{ color: "red", marginLeft: "5px" }}>*</span> </FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone_numbers"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className=" text-white">
                Phone numbers (office /home / mobile)
                <span style={{ color: "red", marginLeft: "5px" }}>*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="emergency_contact"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className=" text-white">
                Emergency Contact Person (Name / mobile / email / address)
                <span style={{ color: "red", marginLeft: "5px" }}>*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="skills_details"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className=" text-white">Skills details  <span style={{ color: "red", marginLeft: "5px" }}>*</span></FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="experience_details"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className=" text-white">Experience Details  <span style={{ color: "red", marginLeft: "5px" }}>*</span></FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="previous_un_missions"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className=" text-white">
                Previous UN Missions
                <span style={{ color: "red", marginLeft: "5px" }}>*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button
            type="submit"
            className="bg-[#fc9948] hover:bg-[#7daed8] rounded-2xl"
          >
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
};

export default UserProfileForm;
