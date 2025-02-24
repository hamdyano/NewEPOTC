import mongoose from "mongoose";







export type ProfileType = {
    name_as_it_appear_in_passport: string;
    gender: string;
    address: string;
    data_of_birth: string;
    zip_postal_code: string;
    passport_number: string;
    passport_issued_date: string;
    passport_expiration_date: string;
    nationality: string;
    current_job: string;
    phone_numbers: string;
    emergency_contact: string;
    skills_details: string;
    experience_details: string;
    previous_un_missions: string;
  };

  const profileSchema = new mongoose.Schema({ 
    name_as_it_appear_in_passport: { type: String },
    gender: { type: String },
    address: { type: String },
    data_of_birth: { type: String },
    zip_postal_code: { type: String },
    passport_number: { type: String },
    passport_issued_date: { type: String },
    passport_expiration_date: { type: String },
    nationality: { type: String },
    current_job: { type: String },
    phone_numbers: { type: String },
    emergency_contact: { type: String },
    skills_details: { type: String },
    experience_details: { type: String },
    previous_un_missions: { type: String },
  });


  
const Profile = mongoose.model<ProfileType>("Profile", profileSchema);

export default Profile;