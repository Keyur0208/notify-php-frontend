import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Nextui_Providers({themeProps,children}: ProvidersProps) {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  )
}

