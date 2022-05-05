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
            }
            else {
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
              $stmt->bindParam(':id_client', $user->id_client);
              $stmt->bindParam(':date_ord', $user-> date("Y-m-d h:i:s A"));
              if ($stmt->execute()) {
                  $response = ['status' => 1, 'message' => 'Record created successfully.'];
                  echo json_encode($response);
              } else {
                  $response = ['status' => 0, 'message' => 'Failed to create record.'];
                  echo json_encode($response);
              }

              $sql2 = "SELECT id_order FROM make WHERE id_client = '$user->id_client' AND date_ord = (SELECT MAX(date_ord) FROM MAKE WHERE id_client = $user->id_client) ";

              $stmt = $conn->prepare($sql2);
              $stmt->execute();
              $id_order = $stmt->fetch(PDO::FETCH_ASSOC);

              $sql3 = "INSERT INTO orders(id, id_client, state, total)
              VALUES('$id_order', '$id_client', :state, :total)";

              $stmt = $conn->prepare($sql3);
              $stmt->bindParam(':state', $user->state);
              $stmt->bindParam(':total', $user-> total);
              if ($stmt->execute()) {
                  $response = ['status' => 1, 'message' => 'Record created successfully.'];
                  echo json_encode($response);
              } else {
                  $response = ['status' => 0, 'message' => 'Failed to create record.'];
                  echo json_encode($response);
              }

              $sql4 = "INSERT INTO shopping_cart(id_order, id_product, amount, total)
              VALUES('$id_order', :id_product, :amount, :total)";

              $stmt = $conn->prepare($sql4);
              $stmt->bindParam(':id_product', $user->id_product);
              $stmt->bindParam(':amount', $user->amount);
              $stmt->bindParam(':total', $user->total);

              if ($stmt->execute()) {
                  $response = ['status' => 1, 'message' => 'Record created successfully.'];
                  echo json_encode($response);
              } else {
                  $response = ['status' => 0, 'message' => 'Failed to create record.'];
                  echo json_encode($response);
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
        $sql = "UPDATE users SET name= :name, email =:email, mobile =:mobile, updated_at =:updated_at WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $updated_at = date('Y-m-d');
        $stmt->bindParam(':id', $user->id);
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':mobile', $user->mobile);
        $stmt->bindParam(':updated_at', $updated_at);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update record.'];
        }
        echo json_encode($response);
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
