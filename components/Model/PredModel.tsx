import * as Dialog from '@radix-ui/react-dialog';
import { IoMdClose } from 'react-icons/io';

interface PredModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  children: React.ReactNode;
}

const PredModal: React.FC<PredModalProps> = ({
  isOpen,
  onChange,
  children
}) => {
  return ( 
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay 
          className="
            bg-neutral-900/90 
            fixed 
            inset-0
          " 
        />
        <Dialog.Content
          className="
            fixed 
            drop-shadow-md 
            border 
            border-neutral-700 
            top-[50%] 
            left-[50%] 
            max-h-full 
            h-full 
            md:h-75vh
            md:max-h-[75vh] 
            w-[105vw]
            md:w-[75vw] 
            md:max-w-[200vw] 
            translate-x-[-50%] 
            translate-y-[-50%] 
            rounded-md 
            bg-neutral-200 
            p-[25px] 
            focus:outline-none
          ">
          <div>
            {children}
          </div>
          <Dialog.Close asChild>
            <button
              className="
                text-neutral-400 
                hover:text-white 
                absolute 
                top-[10px] 
                right-[10px] 
                inline-flex 
                h-[25px] 
                w-[25px] 
                appearance-none 
                items-center 
                justify-center 
                rounded-full 
                focus:outline-none
              "
              aria-label="Close"
            >
              <IoMdClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
 
export default PredModal;