import React, { useEffect } from 'react';
import { 
  Code, 
  Database, 
  Layout, 
  Rocket, 
  Send, 
  Server, 
  Loader2,
  Cpu,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// We export explicit icons for the app UI, but the generated content uses <i> tags that we need to hydrate
export const Icons = {
  Code, Database, Layout, Rocket, Send, Server, Loader2, Cpu, CheckCircle, AlertCircle
};

export const IconHydrator = () => {
  useEffect(() => {
    // This simple effect would normally run lucide.createIcons(), 
    // but since we are in a pure React env, we will just trust the main UI uses components
    // and the generated UI might need a script tag if we were truly deploying it.
    // For this demo, the generated UI won't have working icons unless we inject the script,
    // so we will inject the unpkg script for lucide into the iframe/preview.
  }, []);
  return null;
};
