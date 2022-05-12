<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {

    case "GET":

        $path = explode('/', $_SERVER['REQUEST_URI']);

        if ($path[2] === 'products') {

            $sql = "SELECT * FROM products";

            if (isset($path[3]) && is_numeric($path[3])) {
                $sql .= " WHERE id = :id";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':id', $path[3]);
                $stmt->execute();
                $products = $stmt->fetch(PDO::FETCH_ASSOC);
            } else {
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
            echo json_encode($products);
        }
        if ($path[2] === 'orders') {

            $sql = "SELECT * FROM orders";

            if (isset($path[3]) && is_numeric($path[3])) {
                $sql .= " WHERE id = :id";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':id', $path[3]);
                $stmt->execute();
                $orders = $stmt->fetch(PDO::FETCH_ASSOC);
            } else {
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
            echo json_encode($orders);
        }
        if ($path[2] === 'user') {
            if (isset($path[3]) && is_numeric($path[3])) {
                if (isset($path[4]) && ($path[4] === 'orders')) {
                    if (isset($path[5]) && is_numeric($path[5])) {
                        $sql = "SELECT s.id_order, m.date_ord, p.id, p.name, p.image, s.amount, s.total, o.state FROM products p, shopping_cart s, make m, orders o
                        WHERE p.id = s.id_product AND s.id_order = :id AND m.id_order = s.id_order AND o.id = m.id_order";
                        $stmt = $conn->prepare($sql);
                        $stmt->bindParam(':id', $path[5]);
                        $stmt->execute();
                        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    } else {
                        $sql = "SELECT m.id_order, m.date_ord, o.state FROM make m, orders o where m.id_client = :id AND m.id_order = o.id";
                        $stmt = $conn->prepare($sql);
                        $stmt->bindParam(':id', $path[3]);
                        $stmt->execute();
                        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    }
                } else {
                    $sql = "SELECT * FROM clients";
                    $sql .= " WHERE id = :id";
                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(':id', $path[3]);
                    $stmt->execute();
                    $users = $stmt->fetch(PDO::FETCH_ASSOC);
                }
            } else {
                echo json_encode("errore utente non trovato");
            }
            echo json_encode($users);
        }
        if ($path[2] === 'admin') {



            if ($path[3] === 'orders') {
                if (isset($path[4]) && is_numeric($path[4])) {
                    $sql = "SELECT c.id as 'id_client', c.name as 'name_client', c.surname, c.address, c.city, c.telephone, s.id_order, state, date_ord, p.id, p.name, p.image, s.amount, s.total
                    FROM clients c, orders o, make m, products p, shopping_cart s
                    WHERE m.id_order = o.id
                    AND m.id_client = c.id
                    AND p.id = s.id_product
                    AND s.id_order = :id AND m.id_order = s.id_order";

                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(':id', $path[4]);
                    $stmt->execute();
                    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
                } else {


                    $sql = 'SELECT id_order, c.id, name, surname, state, date_ord, total
                      FROM clients c, orders o, make m
                      WHERE m.id_order = o.id
                      AND m.id_client = c.id
                      ORDER BY date_ord DESC';
                    $stmt = $conn->prepare($sql);
                    $stmt->execute();
                    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
                }
            } else {
                echo json_encode("errore utente non trovato");
            }
            echo json_encode($orders);
        }

        break;
    case "POST":
        $user = json_decode(file_get_contents('php://input'));

        $path = explode('/', $_SERVER['REQUEST_URI']);
        if ($path[2] === 'products') {

            if ($path[3] === 'order') {

                $sql = "INSERT INTO make(id_order, id_client, date_ord)
              VALUES(null, :id_client, :date_ord)";

                $stmt = $conn->prepare($sql);

                $id_client = $user->id_client;
                $data = date("Y-m-d h:i:s");

                $stmt->bindParam(':id_client', $id_client);
                $stmt->bindParam(':date_ord', $data);
                $rst = $stmt->execute();

                $objDb2 = new DbConnect;
                $conn2 = $objDb2->connect();
                $sql2 = 'SELECT id_order FROM make WHERE id_client = :id_client AND date_ord = (SELECT MAX(date_ord) FROM MAKE WHERE id_client = :id_client) ';

                $stmt2 = $conn2->prepare($sql2);
                $stmt2->bindParam(':id_client', $id_client);
                $stmt2->execute();
                $id_order = $stmt2->fetch(PDO::FETCH_ASSOC);

                $objDb3 = new DbConnect;
                $conn3 = $objDb3->connect();
                $sql3 = "INSERT INTO orders(id, state, total)
              VALUES(:id_order, :state, :total)";
                $pp = "attesa di conferma";
                $stmt3 = $conn3->prepare($sql3);
                $stmt3->bindParam(':id_order', $id_order["id_order"]);
                $stmt3->bindParam(':state', $pp);
                $stmt3->bindParam(':total', $user->cart_total);
                $rst2 = $stmt3->execute();

                $prodotti = $user->products;

                foreach ($prodotti as $prodotto) {

                    $objDb4 = new DbConnect;
                    $conn4 = $objDb4->connect();

                    $sql4 = "INSERT INTO shopping_cart(id_order, id_product, amount, total)
                VALUES(:id_order, :id_product, :amount, :total)";

                    $stmt4 = $conn4->prepare($sql4);
                    $total = ($prodotto->quantity * $prodotto->price);
                    $stmt4->bindParam(':id_order', $id_order["id_order"]);
                    $stmt4->bindParam(':id_product', $prodotto->id);
                    $stmt4->bindParam(':amount', $prodotto->quantity);
                    $stmt4->bindParam(':total', $total);

                    $rst3 = $stmt4->execute();
                    echo json_encode($rst3);
                }
            }
            if ($path[3] === 'save') {
                $sql = "INSERT INTO products(id, name, price, description, image, id_category)
              VALUES(null, :name, :price, :description, :image, :id_category)";
                $stmt = $conn->prepare($sql);

                $stmt->bindParam(':name', $user->name);
                $stmt->bindParam(':price', $user->price);
                $stmt->bindParam(':description', $user->description);
                $stmt->bindParam(':image', $user->image);
                $stmt->bindParam(':id_category', $user->id_category);

                if ($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Record created successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to create record.'];
                }
                echo json_encode($response);
            }
            if ($path[3] === 'filter') {

                $sql = "SELECT p.id, p.name, p.price, p.description, p.image FROM products p, category c
                    WHERE p.id_category = c.id";
                $var = 0;

                if ($user->Bianca) {
                    $sql .= " AND (c.name = 'Carne Bianca'";
                    $var++;
                }
                if ($user->Rossa) {
                    if ($var > 0) $sql .= " OR";
                    else {
                        $sql .= " AND (";
                        $var++;
                    }
                    $sql .= " c.name = 'Carne Rossa'";
                }
                if ($user->Preparati) {
                    if ($var > 0) $sql .= " OR";
                    else {
                        $sql .= " AND (";
                        $var++;
                    }
                    $sql .= " c.name = 'Preparati'";
                }
                $sql .= ")";
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

                echo json_encode($products);
            }
        }

        if ($path[2] === 'user') {

            if ($path[3] === 'login') {
                $sql = "SELECT * FROM clients";
                $sql .= " WHERE email = :email AND password = :password";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':email', $user->email);
                $stmt->bindParam(':password', $user->password);

                $stmt->execute();
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                echo json_encode($user);
            }

            if ($path[3] === 'save') {
                $sql = "INSERT INTO clients(id, name, surname, email, password, address, city, telephone)
                VALUES(null, :name, :surname, :email, :password, :address, :city, :telephone)";
                $stmt = $conn->prepare($sql);

                $stmt->bindParam(':name', $user->name);
                $stmt->bindParam(':surname', $user->surname);
                $stmt->bindParam(':email', $user->email);
                $stmt->bindParam(':password', $user->password);
                $stmt->bindParam(':address', $user->address);
                $stmt->bindParam(':city', $user->city);
                $stmt->bindParam(':telephone', $user->telephone);


                if ($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Record created successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to create record.'];
                }
                echo json_encode($response);
            }
        }


        break;

    case "PUT":
        $user = json_decode(file_get_contents('php://input'));
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if ($path[2] === 'user') {
            if (isset($path[3]) && is_numeric($path[3]) && isset($path[4]) && ($path[4] === 'edit')) {
                $sql = "UPDATE clients
                        SET name= :name, surname = :surname, address = :address, city= :city, email =:email, telephone =:telephone WHERE clients.id = :id";
                $stmt = $conn->prepare($sql);

                $stmt->bindParam(':id', $user->id);
                $stmt->bindParam(':name', $user->name);
                $stmt->bindParam(':surname', $user->surname);
                $stmt->bindParam(':address', $user->address);
                $stmt->bindParam(':city', $user->city);
                $stmt->bindParam(':email', $user->email);
                $stmt->bindParam(':telephone', $user->telephone);


                if ($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Record updated successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to update record.'];
                }
                echo json_encode($response);
            }
        }
        if ($path[2] === 'product') {

            if (isset($path[3]) && is_numeric($path[3]) && isset($path[4]) && ($path[4] === 'edit')) {
                $sql = "UPDATE products
                        SET name= :name, price = :price, description= :description, image =:image, id_category =:id_category WHERE products.id = :id";
                $stmt = $conn->prepare($sql);

                $stmt->bindParam(':id', $path[3]);
                $stmt->bindParam(':name', $user->name);
                $stmt->bindParam(':price', $user->price);
                $stmt->bindParam(':description', $user->description);
                $stmt->bindParam(':image', $user->image);
                $stmt->bindParam(':id_category', $user->id_category);


                if ($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Record updated successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to update record.'];
                }
                echo json_encode($response);
            }
        }

        if ($path[2] === 'order_state') {

            if (isset($path[3]) && is_numeric($path[3]) ) {
                $sql = "UPDATE orders
                        SET state= :state WHERE orders.id = :id";
                $stmt = $conn->prepare($sql);

                $stmt->bindParam(':id', $path[3]);
                
                if ($user === 1){
                    $stmt->bindValue(':state', "in preparazione", PDO::PARAM_STR);
                }
                else if ($user === 2){
                    $stmt->bindValue(':state', "in consegna", PDO::PARAM_STR);
                } else if ($user === 3){
                    $stmt->bindValue(':state', "consegnato", PDO::PARAM_STR);
                } 


                if ($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'State updated successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to update state.'];
                }
                echo json_encode($response);
            }
        }

        break;

    case "DELETE":
        $path = explode('/', $_SERVER['REQUEST_URI']);

        if ($path[2] === 'products') {

            $sql = "DELETE FROM products WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);

            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to delete record.'];
            }
            echo json_encode($response);
            break;
        }
}
