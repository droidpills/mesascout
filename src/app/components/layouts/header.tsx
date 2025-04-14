import { getSeasons } from "@/lib/firebaseConfig";
import HeaderClient from "../headerClient";

const HeaderServer = async () => {
  const seasons = await getSeasons();

  return <HeaderClient seasons={seasons} />;
};

export default HeaderServer;
