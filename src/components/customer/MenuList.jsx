import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import axios from "axios";
import Button from "../common/Button";

const MenuList = () => {
  const [menu, setMenu] = useState([]);
  const [filter, setFilter] = useState("전체");
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/menu/list"
        );

        if (Array.isArray(response.data)) {
          setMenu(response.data);
          const uniqueCategories = [
            ...new Set(response.data.map((item) => item.categoryname)),
          ];
          setCategories(uniqueCategories);
        } else {
          console.warn("응답 데이터가 예상한 형태가 아닙니다:", response.data);
          setMenu([]);
          setCategories([]);
        }
      } catch (error) {
        console.error("메뉴 데이터 가져오기 오류:", error);
        setMenu([]);
        setCategories([]);
      }
    };

    fetchMenuData();
  }, []);

  const filterMenu = () => {
    let filtered = menu;

    if (filter !== "전체") {
      filtered = filtered.filter((item) => item.categoryname === filter);
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.menuName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMenu = filterMenu();

  const renderMenuByCategory = () => {
    if (filter === "전체") {
      const menuByCategory = {};
      filteredMenu.forEach((item) => {
        if (!menuByCategory[item.categoryname]) {
          menuByCategory[item.categoryname] = [];
        }
        menuByCategory[item.categoryname].push(item);
      });

      return Object.entries(menuByCategory).map(([category, items], index) => (
        <div key={category} style={{ marginBottom: "20px" }}>
          <h2
            style={{
              textAlign: "center",
              backgroundColor: "rgb(230, 230, 230)",
              padding: "10px",
            }}
          >
            {category}
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            {items.map((menu) => (
              <Menu
                key={menu.menuid}
                name={menu.menuName}
                detail={menu.detail}
                image={menu.menuImg}
              />
            ))}
          </div>
        </div>
      ));
    } else {
      return (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {filteredMenu.map((menu) => (
            <Menu
              key={menu.menuid}
              name={menu.menuName}
              detail={menu.detail}
              image={menu.menuImg}
            />
          ))}
        </div>
      );
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <Button onClick={() => setFilter("전체")}>전체</Button>

        {categories.map((category) => (
          <Button key={category} onClick={() => setFilter(category)}>
            {category}
          </Button>
        ))}

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <input
            type="text"
            placeholder="메뉴 이름으로 검색"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ marginRight: "10px" }}
          />
        </div>
      </div>
      {renderMenuByCategory()}
    </div>
  );
};

export default MenuList;
