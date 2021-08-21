import { useState, useEffect } from "react"
import { useAppContext } from "../utils/AppContext"
import ProductCreateEdit from "../components/ProductCreateEdit";

const ProductAdmin = (props) => {
  const appCtx = useAppContext()

  const [ renderReady, setRenderReady ] = useState(false)

  useEffect( () => {
    setRenderReady(true);
  }, [])

  return (
    <>
      { renderReady === true && (
         <>
            <h2>Create or Edit Product</h2>
            <ProductCreateEdit />
         </>
      )}
      <style jsx="true">{`

      `}</style>
    </>
  )
}

export default ProductAdmin