import axios from "axios";
//
const fetchMenus = async () => {
  const response = await axios.get("https://api/webbucks/menus");
  return response.data;
};

export default fetchMenus;
