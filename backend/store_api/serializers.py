def product_item(p):

    categoryList = []
    for c in p.categories:
        category = {}
        category["id"] = c.id
        category["name"] = c.name
        categoryList.append(category)

    product_item = {}
    product_item["id"] = p.id
    product_item["name"] = p.name
    product_item["image_path"] = p.image_path
    product_item["product_uuid"] = p.product_uuid
    product_item["price"] = p.price
    product_item["quantity"] = p.quantity
    product_item["categories"] = categoryList

    return product_item
