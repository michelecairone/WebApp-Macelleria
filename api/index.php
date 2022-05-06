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

            $sql = "SELECT * FROM clients";

            if (isset($path[3]) && is_numeric($path[3])) {
                $sql .= " WHERE id = :id";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':id', $path[3]);
                $stmt->execute();
                $users = $stmt->fetch(PDO::FETCH_ASSOC);
            } else {
                echo json_encode("errore utente non trovato");
            }
            echo json_encode($users);
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
              $stmt->bindParam(':date_ord', $data );
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
              $pp = "da settare";
              $stmt3 = $conn3->prepare($sql3);
              $stmt3->bindParam(':id_order', $id_order["id_order"]);
              $stmt3->bindParam(':state', $pp);
              $stmt3->bindParam(':total', $user-> cart_total);
              $rst2 = $stmt3->execute();

              $prodotti = $user -> products;

              foreach($prodotti as $prodotto) {

                $objDb4 = new DbConnect;
                $conn4 = $objDb4->connect();

                $sql4 = "INSERT INTO shopping_cart(id_order, id_product, amount, total)
                VALUES(:id_order, :id_product, :amount, :total)";

                $stmt4 = $conn4->prepare($sql4);
                $total = ($prodotto -> quantity * $prodotto -> price);
                $stmt4->bindParam(':id_order', $id_order["id_order"]);
                $stmt4->bindParam(':id_product', $prodotto -> id);
                $stmt4->bindParam(':amount', $prodotto -> quantity);
                $stmt4->bindParam(':total', $total);

                $rst3 = $stmt4->execute();
                echo json_encode($rst3);
            }
          }

            if ($path[3] === 'save') {
                $sql = "INSERT INTO products(id, name, price, amount, description, image, id_category)
              VALUES(null, :name, :price, :amount, :description, :image, :id_category)";
                $stmt = $conn->prepare($sql);

                $stmt->bindParam(':name', $user->name);
                $stmt->bindParam(':price', $user->price);
                $stmt->bindParam(':amount', $user->amount);
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

                $sql = "SELECT p.id, p.name, p.price, p.amount, p.description, p.image FROM products p, category c
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

        break;

    case "DELETE":
        $sql = "DELETE FROM users WHERE id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);

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
