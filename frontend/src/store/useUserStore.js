import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      profile: {
        name: '',
        phone: '',
        address: '',
        landmark: '',
        pincode: '',
      },
      setProfile: (newProfile) => set({ profile: newProfile }),
    }),
    {
      name: 'grocery-user-profile',
    }
  )
);

export default useUserStore;
