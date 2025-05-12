import { useEffect, useState } from "react";
import { Toast } from "./toast";
import { useToast } from "./use-toast";

export function Toaster() {
  const { visible, message, type, hideToast } = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Toast visible={visible} message={message} type={type} onHide={hideToast} />
  );
}
