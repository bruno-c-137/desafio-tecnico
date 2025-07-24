import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface ModalProps {
  isOpen: boolean;
  errors: Array<any | undefined> | undefined;
  onClose: () => void;
}
export default function DialogError({ isOpen, errors, onClose }: ModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[99999] dialog-custom"
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="relative">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white px-10  py-6  text-left align-middle shadow-xl transition-all z-10 relative">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-medium leading-6 text-vermelho-1"
                  >
                    Atenção
                  </Dialog.Title>
                  <div className="my-5 space-y-1">
                    {errors?.map((item: any, index: any) => {
                      return (
                        <p className="text-base text-red-400" key={index}>
                          * {item}
                        </p>
                      );
                    })}
                  </div>

                  <div className="mt-4 flex justify-center">
                    <button

                      type="button"
                      className=" text-base sm:text-lg text-white bg-black rounded-md py-2 px-16 md:px-12 btn uppercase"
                      onClick={onClose}
                    >
                      OK
                    </button>
                  </div>
                </Dialog.Panel>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
