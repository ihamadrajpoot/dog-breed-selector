import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import DogBreedSelector from "./index";

describe("DogBreedSelector", () => {
    it("renders without error", () => {
        render(<DogBreedSelector />);
        expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("loads breeds data from API", async () => {
        render(<DogBreedSelector />);
        await waitFor(() => {
            expect(screen.getByText("Choose a breed")).toBeInTheDocument();
        });
    });

    it("stores selected breed in the state", async () => {
        render(<DogBreedSelector />);
        const selectBreed = async () => {
            const breedDropdown = screen.getByRole("combobox") as HTMLSelectElement;
            const breedOption = screen.getByText("beagle");
            fireEvent.change(breedDropdown, { target: { value: breedOption.textContent } });
            expect(breedDropdown.value).toBe("beagle");
        };
        await waitFor(selectBreed);
    });


    it("displays error message when no breed is selected", async () => {
        render(<DogBreedSelector />);
        const button = screen.getByText("View Images");
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText("Please select a breed.")).toBeInTheDocument();
        });
    });
});
