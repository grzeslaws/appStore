def product_item(p):

    product_item = {}
    product_item["id"] = p.id
    product_item["name"] = p.name
    product_item["image_path"] = p.image_path
    product_item["product_uuid"] = p.product_uuid
    product_item["price"] = p.price
    return product_item
