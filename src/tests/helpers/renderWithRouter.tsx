import { MemoryRouter } from "react-router";

export const renderWithRouter = (component: React.ReactNode) => {
  return <MemoryRouter>{component}</MemoryRouter>;
};
