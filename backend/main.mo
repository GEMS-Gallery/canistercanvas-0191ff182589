import Hash "mo:base/Hash";
import Text "mo:base/Text";

import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Result "mo:base/Result";

actor {
  // Define the Drawing type
  type Drawing = {
    imageData: Text;
  };

  // Stable variable to store drawings
  stable var drawingsEntries : [(Principal, [Drawing])] = [];

  // HashMap to store drawings for each user
  var drawings = HashMap.HashMap<Principal, [Drawing]>(10, Principal.equal, Principal.hash);

  // Initialize the HashMap with stable data
  system func preupgrade() {
    drawingsEntries := Iter.toArray(drawings.entries());
  };

  system func postupgrade() {
    drawings := HashMap.fromIter<Principal, [Drawing]>(drawingsEntries.vals(), 10, Principal.equal, Principal.hash);
  };

  // Save a drawing
  public shared(msg) func saveDrawing(imageData: Text) : async Result.Result<Text, Text> {
    let caller = msg.caller;
    let drawing : Drawing = { imageData };
    
    switch (drawings.get(caller)) {
      case (null) {
        drawings.put(caller, [drawing]);
      };
      case (?existingDrawings) {
        drawings.put(caller, Array.append<Drawing>(existingDrawings, [drawing]));
      };
    };
    
    #ok("Drawing saved successfully")
  };

  // Get all drawings for the caller
  public shared(msg) func getDrawings() : async [Drawing] {
    let caller = msg.caller;
    
    switch (drawings.get(caller)) {
      case (null) { [] };
      case (?userDrawings) { userDrawings };
    }
  };
}
