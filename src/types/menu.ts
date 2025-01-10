export interface MenuItem {
  title: string;
  url: string;
  icon: any;
}

export interface MenuSection {
  category: string;
  items: MenuItem[];
}