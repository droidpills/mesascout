'use client'
import { useState, useEffect } from "react";
import { getSeasons, Season } from "@/lib/firebaseConfig";

const useSeasons = () => {
  const [seasons, setSeasons] = useState<Season[]>([]);

  useEffect(() => {
      const fetchSeasons = async () => {
        const data = await getSeasons();
        setSeasons(data);
      };
      fetchSeasons();
    }, []);

  return seasons;
};

export default useSeasons;
