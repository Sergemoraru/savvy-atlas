"use client"

import { useState } from "react";
import { useRouter } from "next/navigation"; // Standard import for useRouter
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Typography,
} from "@mui/material";

export default function Home() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departureDate: new Date().toISOString().slice(0, 10),
    returnDate: new Date().toISOString().slice(0, 10),
    travelType: "",
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    router.push({
      pathname: "/Results",
      query: formData,
    });
  };

  return (
    <div
      className="bg-blue-50 min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/images/homeBg.jpg')" }}
    >
      <Container
        maxWidth="sm"
        className="p-8 rounded-lg shadow bg-white bg-opacity-70"
      >
        <Typography
          variant="h4"
          className="text-center mb-4 font-bold font-header"
        >
          Find Your Next Adventure
        </Typography>
        <form noValidate autoComplete="off">
          <div className="mb-4">
            <TextField
              fullWidth
              label="From"
              value={formData.from}
              onChange={handleChange}
              variant="outlined"
              className="mb-4"
            />
            <TextField
              fullWidth
              label="To"
              variant="outlined"
              className="mb-4"
            />
            <TextField
              fullWidth
              label="Departure Date"
              type="date"
              defaultValue={new Date().toISOString().slice(0, 10)}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              className="mb-4"
            />
            <TextField
              fullWidth
              label="Return Date"
              type="date"
              defaultValue={new Date().toISOString().slice(0, 10)}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              className="mb-4"
            />
          </div>
          <FormControl fullWidth className="mb-4">
            <InputLabel id="travel-type-select-label">Travel Type</InputLabel>
            <Select
              labelId="travel-type-select-label"
              id="travel-type-select"
              value=""
              label="Travel Type"
              onChange={() => {}}
            >
              <MenuItem value="business">Business</MenuItem>
              <MenuItem value="leisure">Leisure</MenuItem>
              <MenuItem value="adventure">Adventure</MenuItem>
            </Select>
          </FormControl>
          <div className="flex justify-center">
            <Button
              onClick={handleSearch}
              className="bg-cyan-500 text-slate-50 font-body hover:bg-teal-500 transition-transform transform hover:scale-105"
            >
              Search Deals
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
}
