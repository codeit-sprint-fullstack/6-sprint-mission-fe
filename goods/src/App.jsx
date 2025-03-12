import { BestProducts } from "./BestProducts";
import { PageFooter } from "./PageFooter";
import { PageHeader } from "./PageHeader";
import { Products } from "./Products";

function App() {
  return (
    <div>
      <PageHeader />
      <BestProducts />
      <Products />
      <PageFooter />
    </div>
  );
}

export default App;
