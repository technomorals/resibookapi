const InstagramUserProfile = require("../../Model/InstagramUserProfile");
const UserModel = require("../../Model/UserModel");

class DataManager {
  constructor() {}

  clean(obj) {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
    return obj;
  }
  saveUser(user, callback) {
    var model = {};

    model["bio"] = user.biography == undefined ? "" : user.biography;
    model["username"] = user.username == undefined ? "" : user.username;
    model["fullName"] = user.fullName == undefined ? "" : user.fullName;
    model["is_private"] = user.is_private == undefined ? "" : user.is_private;
    model["is_verified"] =
      user.is_verified == undefined ? "" : user.is_verified;
    model["id"] = user.id == undefined ? "" : user.id;
    model["is_business_account"] =
      user.is_business_account == undefined ? "" : user.is_business_account;
    model["category_name"] =
      user.category_name == undefined ? "" : user.category_name;
    model["category"] = user.category == undefined ? "" : user.category;
    model["fbid"] = user.fbid == undefined ? "" : user.fbid;
    model["profile_pic_url"] =
      user.profile_pic_url == undefined ? "" : user.profile_pic_url;
    model["profile_pic_url_hd"] =
      user.profile_pic_url_hd == undefined ? "" : user.profile_pic_url_hd;

    if (
      user["edge_followed_by"] != undefined &&
      user["edge_followed_by"]["count"] != undefined
    ) {
      model["followers"] =
        user.edge_followed_by.count == 0 ? 0 : user.edge_followed_by.count;
    } else {
      model["followers"] = -1;
    }

    if (
      user["edge_follow"] != undefined &&
      user["edge_follow"]["count"] != undefined
    ) {
      model["following"] =
        user.edge_follow.count == 0 ? 0 : user.edge_follow.count;
    } else {
      model["following"] = -1;
    }

    callback(model);
  }

  async data_(data) {
    return new Promise(async (resolve, reject) => {
      var user = data;

      if (data["graphql"]) {
        user = data["graphql"];
      }

      if (user && user["user"]) {
        user = user["user"];
      }

      if (user) {
        var id = user["id"] ?? user["pk"] ?? user["pk_id"];
        var username = user["username"];
        var fbid = user["fbid"];
        var full_name = user["full_name"];
        var edge_follow = user["edge_follow"];

        if (edge_follow && edge_follow["count"]) {
          edge_follow = edge_follow["count"];
        }

        var edge_followed_by = user["edge_followed_by"];

        if (edge_followed_by && edge_followed_by["count"]) {
          edge_followed_by = edge_followed_by["count"];
        }

        var media_count = user["edge_owner_to_timeline_media"];

        if (media_count && media_count["count"]) {
          media_count = media_count["count"];
        }

        var profile_pic_url = ""; //user["profile_pic_url"];
        var profile_pic_url_hd = ""; //user["profile_pic_url_hd"];
        var is_private = user["is_private"];
        var is_verified = user["is_verified"] ?? user["isverified"];
        var biography = user["biography"];
        var is_business_account = user["is_business_account"];
        var is_professional_account = user["is_professional_account"];
        var category = user["category"];
        var category_name = user["category_name"];

        // console.log(Object.keys(user));

        var user_final_response = {
          id: id,
          username: username,
          fbid: fbid,
          fullname: full_name,
          following_count: edge_follow,
          follower_count: edge_followed_by,
          media_count: media_count,
          profile_pic_url: profile_pic_url,
          profile_pic_url_hd: profile_pic_url_hd,
          is_private: is_private,
          is_verified: is_verified,
          biography: biography,
          is_business_account: is_business_account,
          is_professional_account: is_professional_account,
          category: category,
          category_name: category_name,
        };
        console.log('Data Added: ', username ?? '');

        user_final_response = this.clean(user_final_response);

        var res = await InstagramUserProfile.findOneAndUpdate(
          { id: user_final_response.id },
          user_final_response,
          { upsert: true }
        );

        var latest_user = await InstagramUserProfile.find({
          id: user_final_response.id,
        }).limit(1);

        var _f = this.postsFromUser(data);
        // console.log("- - - - - - - - - - - - - - - - - - - - - - -");
        // console.log(_f);
        resolve({
          status: true,
          data: latest_user,
        });
      } else {
        console.log("User Data Not Found. 1");
        resolve({
          status: false,
        });
      }
    });
  }

  postsFromUser(data) {
    var data = data;
    var results = [];
    if (data["graphql"]) {
      data = data["graphql"];
    }

    if (data["user"]) {
      data = data["user"];
    }

    if (data) {
      results = this.profileData(data);

      let media_data = data["edge_owner_to_timeline_media"];
      if (!media_data) {
        return;
      }
      if (media_data["edges"]) {
        media_data = media_data["edges"];
      }
      var post_data = [];
      if (media_data.length > 0) {
        for (let index = 0; index < media_data.length; index++) {
          const element = media_data[index];
          let _ = scrapping(element);
          // console.log(_);
          post_data.push(_);
        }
      }
      results["posts"] = post_data;
    }
    return results;
  }

  profileData(data) {
    var data = data;
    var result = {};

    if (data["graphql"]) {
      data = data["graphql"];
    }

    if (data["user"]) {
      data = data["user"];
    }

    if (data["biography"]) {
      result["biography"] = data["biography"];
    }

    if (data["external_url"]) {
      result["external_url"] = data["external_url"];
    }

    if (data["edge_followed_by"]) {
      result["edge_followed_by"] = data["edge_followed_by"];
    }

    if (data["fbid"]) {
      result["fbid"] = data["fbid"];
    }

    if (data["edge_follow"]) {
      result["edge_follow"] = data["edge_follow"];
    }

    if (data["full_name"]) {
      result["full_name"] = data["full_name"];
    }

    if (data["highlight_reel_count"]) {
      result["highlight_reel_count"] = data["highlight_reel_count"];
    }

    if (data["id"]) {
      result["id"] = data["id"];
    }
    if (data["is_business_account"]) {
      result["is_business_account"] = data["is_business_account"];
    }
    if (data["is_professional_account"]) {
      result["is_professional_account"] = data["is_professional_account"];
    }
    if (data["category_name"]) {
      result["category_name"] = data["category_name"];
    }
    if (data["is_private"]) {
      result["is_private"] = data["is_private"];
    }
    if (data["is_verified"]) {
      result["is_verified"] = data["is_verified"];
    }
    if (data["is_verified_by_mv4b"]) {
      result["is_verified_by_mv4b"] = data["is_verified_by_mv4b"];
    }
    if (data["profile_pic_url"]) {
      result["profile_pic_url"] = data["profile_pic_url"];
    }
    if (data["profile_pic_url_hd"]) {
      result["profile_pic_url_hd"] = data["profile_pic_url_hd"];
    }
    if (data["username"]) {
      result["username"] = data["username"];
    }

    if (data["edge_owner_to_timeline_media"]) {
      result["edge_owner_to_timeline_media"] =
        data["edge_owner_to_timeline_media"];
    }

    if (data["edge_related_profiles"]) {
      var _user_list = data["edge_related_profiles"];
      _user_list = _user_list["edges"];
      if (typeof _user_list == "object") {
        if (_user_list.length > 0) {
          for (let index = 0; index < _user_list.length; index++) {
            if (_user_list[index]) {
              addNewUserData(_user_list[index]);
            }
          }
        }
      }
    }
    return result;
  }

  async addNewUserData(userData) {
    var userData = userData;
    if (userData["node"]) {
      userData = userData["node"];
    }
    try {
      var _data = await downloadImage(
        userData["profile_pic_url"],
        `/ProfileIamge/${userData["id"]}.png`
      );
      console.log(_data);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new DataManager();
