
import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import { useOrder } from '@/contexts/OrderContext';
import { HOSPITALS } from '@/lib/constants';

const HospitalSelector = () => {
  const { hospital, updateHospital } = useOrder();
  const [selectedHospital, setSelectedHospital] = useState(hospital);

  const handleHospitalSelect = (value: string) => {
    setSelectedHospital(value);
  };

  const handleSave = () => {
    updateHospital(selectedHospital);
  };

  return (
    <Dialog>
      <div className="bg-white rounded-2xl shadow-elegant p-5 border border-gray-100 flex flex-col h-full transition-all hover:shadow-card">
        <div className="flex items-center mb-2">
          <MapPin size={18} className="mr-2 text-primary" />
          <span className="font-medium text-sm text-gray-500">Delivery Location</span>
        </div>
        <div className="mt-1 mb-4">
          <h3 className="font-medium text-lg text-balance">{hospital}</h3>
        </div>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="mt-auto">
            Change Hospital
          </Button>
        </DialogTrigger>
      </div>
      
      <DialogContent className="sm:max-w-md glassmorphism">
        <DialogHeader>
          <DialogTitle>Select Hospital</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4 py-4">
          <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Search hospitals..." />
            <CommandList>
              <CommandEmpty>No hospital found.</CommandEmpty>
              <CommandGroup>
                {HOSPITALS.map((h) => (
                  <CommandItem
                    key={h}
                    value={h}
                    onSelect={() => handleHospitalSelect(h)}
                    className={`cursor-pointer ${selectedHospital === h ? 'bg-primary/10 text-primary' : ''}`}
                  >
                    {h}
                    {selectedHospital === h && (
                      <svg
                        className="ml-auto h-4 w-4 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
        <div className="flex justify-end">
          <DialogClose asChild>
            <Button onClick={handleSave}>Save</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HospitalSelector;
