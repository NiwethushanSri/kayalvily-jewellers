// Product photos downloaded from the Devi category pages, grouped by section.
// Names are design codes. Prices show as "Price on enquiry" until you send them.
export type Product = { image: string; name: string };
export type ProductGroup = { id: string; title: string; items: Product[] };

export const productGroups: ProductGroup[] = [
  {
    id: "gold",
    title: "Gold Jewellery",
    items: [
    { image: "/products/gold-jewellery--DHP24D3365.jpg", name: "DHP24D3365" },
    { image: "/products/gold-jewellery--DVP25A4022.jpg", name: "DVP25A4022" },
    { image: "/products/gold-jewellery--DVP25A4721.jpg", name: "DVP25A4721" },
    { image: "/products/gold-jewellery--DVP25H3952.jpg", name: "DVP25H3952" },
    { image: "/products/gold-jewellery--DVP25H5572.jpg", name: "DVP25H5572" },
    { image: "/products/gold-jewellery--DVP25I3010.jpg", name: "DVP25I3010" },
    { image: "/products/gold-jewellery--DVP25K1462.jpg", name: "DVP25K1462" },
    { image: "/products/gold-jewellery--DVP25L1038.jpg", name: "DVP25L1038" },
    ],
  },
  {
    id: "diamond",
    title: "Diamond Jewellery",
    items: [
    { image: "/products/diamond-jewellery--DHP23J13256.jpg", name: "DHP23J13256" },
    { image: "/products/diamond-jewellery--DHP23K43.jpg", name: "DHP23K43" },
    { image: "/products/diamond-jewellery--DVP26L2840.jpg", name: "DVP26L2840" },
    { image: "/products/diamond-jewellery--DVP26L2857.jpg", name: "DVP26L2857" },
    { image: "/products/diamond-jewellery--DVP26L2981.jpg", name: "DVP26L2981" },
    { image: "/products/diamond-jewellery--DVP26L2998.jpg", name: "DVP26L2998" },
    { image: "/products/diamond-jewellery--R-14528.jpg", name: "R-14528" },
    { image: "/products/diamond-jewellery--R-14710.jpg", name: "R-14710" },
    { image: "/products/diamond-jewellery--R-14894.jpg", name: "R-14894" },
    { image: "/products/diamond-jewellery--R-15984.jpg", name: "R-15984" },
    ],
  },
  {
    id: "lightweight",
    title: "Light Weight Collection",
    items: [
    { image: "/products/light-weight-collection--DHP23K4571.jpg", name: "DHP23K4571" },
    { image: "/products/light-weight-collection--DHP24L3157.jpg", name: "DHP24L3157" },
    { image: "/products/light-weight-collection--DVP25I843-DVP25I864-DVP25I856.jpg", name: "DVP25I843-DVP25I864-DVP25I856" },
    { image: "/products/light-weight-collection--DVP26G8364.jpg", name: "DVP26G8364" },
    { image: "/products/light-weight-collection--DVP26H4215.jpg", name: "DVP26H4215" },
    { image: "/products/light-weight-collection--DVP26H9043.jpg", name: "DVP26H9043" },
    { image: "/products/light-weight-collection--DVP26J50.jpg", name: "DVP26J50" },
    { image: "/products/light-weight-collection--DVP26K1694.jpg", name: "DVP26K1694" },
    { image: "/products/light-weight-collection--DVP26K1878.jpg", name: "DVP26K1878" },
    { image: "/products/light-weight-collection--DVP26L1536.jpg", name: "DVP26L1536" },
    ],
  },
  {
    id: "featured",
    title: "Featured Collection",
    items: [
    { image: "/products/featured-collection--DHP24D3365.jpg", name: "DHP24D3365" },
    { image: "/products/featured-collection--DVP25H3952.jpg", name: "DVP25H3952" },
    { image: "/products/featured-collection--DVP25H5572.jpg", name: "DVP25H5572" },
    { image: "/products/featured-collection--DVP25K1462.jpg", name: "DVP25K1462" },
    { image: "/products/featured-collection--DVP25L1038.jpg", name: "DVP25L1038" },
    ],
  },
  {
    id: "mens",
    title: "Mens Collection",
    items: [
    { image: "/products/mens-collection--DHP23I12645.jpg", name: "DHP23I12645" },
    { image: "/products/mens-collection--DVP26D6570.jpg", name: "DVP26D6570" },
    { image: "/products/mens-collection--DVP26G1139.jpg", name: "DVP26G1139" },
    { image: "/products/mens-collection--DVP26H5606-edit-one.jpg", name: "DVP26H5606" },
    { image: "/products/mens-collection--DVP26H7900.jpg", name: "DVP26H7900" },
    { image: "/products/mens-collection--DVP26I6592.jpg", name: "DVP26I6592" },
    { image: "/products/mens-collection--DVP26K323.jpg", name: "DVP26K323" },
    { image: "/products/mens-collection--DVP26K6338.jpg", name: "DVP26K6338" },
    ],
  },
];
