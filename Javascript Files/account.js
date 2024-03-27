document.addEventListener('DOMContentLoaded', () => {
    const profileData = JSON.parse(localStorage.getItem('userProfile')) || {};
    const userName = document.getElementById('userName');
    const userSchoolYear = document.getElementById('userSchoolYear');
    const userIntendedMajor = document.getElementById('userIntendedMajor');
    const userInterests = document.getElementById('userInterests');
    const profilePicture = document.getElementById('profilePicture');

    // Set placeholders for profile fields if the data is not available
    userName.innerText = profileData.name || 'Name';
    userSchoolYear.innerText = profileData.schoolYear || 'School Year';
    userIntendedMajor.innerText = profileData.intendedMajor || 'Intended Major';
    userInterests.innerText = profileData.interests || 'Interests';
    profilePicture.src = profileData.profilePicture || 'profile_picture.jpg';

    const postFeed = document.getElementById('postFeed');
    postFeed.innerHTML = '';
    if (profileData.posts) {
        profileData.posts.forEach(post => {
            const postCard = createPostCard(post);
            postFeed.appendChild(postCard);
        });
    }
});

const profileFields = document.querySelectorAll('[contenteditable="true"]');
profileFields.forEach(field => {
    field.addEventListener('input', () => {
        const userProfile = {
            name: document.getElementById('userName').innerText,
            schoolYear: document.getElementById('userSchoolYear').innerText,
            intendedMajor: document.getElementById('userIntendedMajor').innerText,
            interests: document.getElementById('userInterests').innerText,
            profilePicture: document.getElementById('profilePicture').src,
            posts: getPostsData(),
        };
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
    });

    // Show placeholder text when the field is not edited yet
    field.addEventListener('focus', () => {
        if (field.innerText === field.getAttribute('data-placeholder')) {
            field.innerText = '';
        }
    });

    // Add placeholder text when the field is clicked to edit
    field.addEventListener('blur', () => {
        if (field.innerText === '') {
            field.innerText = field.getAttribute('data-placeholder');
        }
    });
});

function previewImage(event) {
    const profilePicture = document.getElementById('profilePicture');
    profilePicture.src = URL.createObjectURL(event.target.files[0]);
}

function openEditProfile() {
    document.getElementById("editProfileModal").style.display = "block";
    document.getElementById("editUserName").value = document.getElementById("userName").innerText;
    document.getElementById("editUserSchoolYear").value = document.getElementById("userSchoolYear").innerText;
    document.getElementById("editUserIntendedMajor").value = document.getElementById("userIntendedMajor").innerText;
    document.getElementById("editUserInterests").value = document.getElementById("userInterests").innerText;
}

function closeEditProfile() {
    document.getElementById("editProfileModal").style.display = "none";
}

function saveEditProfile() {
    document.getElementById("userName").innerText = document.getElementById("editUserName").value;
    document.getElementById("userSchoolYear").innerText = document.getElementById("editUserSchoolYear").value;
    document.getElementById("userIntendedMajor").innerText = document.getElementById("editUserIntendedMajor").value;
    document.getElementById("userInterests").innerText = document.getElementById("editUserInterests").value;
    closeEditProfile();
}

function submitPost() {
    const postContent = document.getElementById("postContent").value;
    if (postContent.trim() !== "") {
        const post = {
            content: postContent,
            likes: 0,
            comments: [],
        };
        const postCard = createPostCard(post);
        const postFeed = document.getElementById('postFeed');
        postFeed.prepend(postCard);
        document.getElementById("postContent").value = '';
        updateLocalStorage();
    }
}

function createPostCard(post) {
    const postCard = document.createElement("div");
    postCard.classList.add("post-card");

    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");
    const userImage = document.createElement("img");
    userImage.src = document.getElementById("profilePicture").src;
    userImage.alt = "Profile Picture";
    const userName = document.createElement("h3");
    userName.innerText = document.getElementById("userName").innerText;
    userInfo.appendChild(userImage);
    userInfo.appendChild(userName);

    const postContent = document.createElement("div");
    postContent.classList.add("post-content");
    postContent.innerText = post.content;

    const postActions = document.createElement("div");
    postActions.classList.add("post-actions");
    const likeIcon = document.createElement("i");
    likeIcon.classList.add("fas", "fa-thumbs-up");
    const likeCount = document.createElement("span");
    likeCount.innerText = post.likes + " Likes";
    const commentIcon = document.createElement("i");
    commentIcon.classList.add("fas", "fa-comment");
    const commentCount = document.createElement("span");
    commentCount.innerText = post.comments.length + " Comments";
    postActions.appendChild(likeIcon);
    postActions.appendChild(likeCount);
    postActions.appendChild(commentIcon);
    postActions.appendChild(commentCount);

    const commentsSection = document.createElement("div");
    commentsSection.classList.add("comments");
    post.comments.forEach(comment => {
        const commentDiv = document.createElement("div");
        commentDiv.classList.add("comment");
        const commentUserImage = document.createElement("img");
        commentUserImage.src = document.getElementById("profilePicture").src;
        commentUserImage.alt = "Profile Picture";
        const commentContent = document.createElement("p");
        commentContent.innerText = comment;
        commentDiv.appendChild(commentUserImage);
        commentDiv.appendChild(commentContent);
        commentsSection.appendChild(commentDiv);
    });

    postCard.appendChild(userInfo);
    postCard.appendChild(postContent);
    postCard.appendChild(postActions);
    postCard.appendChild(commentsSection);
    return postCard;
}

function getPostsData() {
    const postFeed = document.getElementById('postFeed').querySelectorAll('.post-card');
    const postsData = [];
    postFeed.forEach(card => {
        const content = card.querySelector('.post-content').innerText;
        const likes = parseInt(card.querySelector('.post-actions span:nth-child(1)').innerText);
        const comments = [];
        const commentElements = card.querySelectorAll('.comments .comment p');
        commentElements.forEach(comment => {
            comments.push(comment.innerText);
        });
        postsData.push({ content, likes, comments });
    });
    return postsData;
}

function updateLocalStorage() {
    const userProfile = {
        name: document.getElementById('userName').innerText,
        schoolYear: document.getElementById('userSchoolYear').innerText,
        intendedMajor: document.getElementById('userIntendedMajor').innerText,
        interests: document.getElementById('userInterests').innerText,
        profilePicture: document.getElementById('profilePicture').src,
        posts: getPostsData(),
    };
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
}

// Function to display interests in the "About" section
function displayInterests() {
  const interestsList = document.getElementById('interestsList');
  interestsList.innerHTML = '';

  // Replace the following array with the user's interests stored in the profile data
  const interestsData = ['Music', 'Photography', 'Sports', 'Travel'];

  interestsData.forEach(interest => {
    const li = document.createElement('li');
    li.innerText = interest;
    interestsList.appendChild(li);
  });
}

// Function to display education details in the "About" section
function displayEducation() {
  // Replace the following data with the user's education details stored in the profile data
  const educationYear = 'Class of 2023';
  const educationSubjects = 'Computer Science, Mathematics, Physics';
  const educationAcademicType = 'IB';
  const educationGrades = 'A, A, B';

  document.getElementById('educationYear').innerText = educationYear;
  document.getElementById('educationSubjects').innerText = educationSubjects;
  document.getElementById('educationAcademicType').innerText = educationAcademicType;
  document.getElementById('educationGrades').innerText = educationGrades;
}

// Function to open the "Interests" edit modal
function editInterests() {
  // Add your logic to open the edit modal and allow the user to edit their interests
  // Save the updated interests in the profile data
  // Call displayInterests() to refresh the interests displayed in the section
}

// Function to open the "Education" edit modal
function editEducation() {
  // Add your logic to open the edit modal and allow the user to edit their education details
  // Save the updated education data in the profile data
  // Call displayEducation() to refresh the education details displayed in the section
}

// Call the display functions to populate the sections with user data
displayInterests();
displayEducation();

// Function to toggle the view to show the "Posts" section
function showPosts() {
  document.getElementById('postsSection').style.display = 'block';
  document.getElementById('aboutSection').style.display = 'none';
}

// Function to toggle the view to show the "About" section
function showAbout() {
  document.getElementById('postsSection').style.display = 'none';
  document.getElementById('aboutSection').style.display = 'block';
}

// Call the showPosts function by default to display the "Posts" section
showPosts();

function showPostsView() {
  document.getElementById('postsSection').style.display = 'block';
  document.getElementById('aboutSection').style.display = 'none';
}

function showAboutView() {
  document.getElementById('postsSection').style.display = 'none';
  document.getElementById('aboutSection').style.display = 'block';
}

// Call the showPostsView function by default to display the "Posts" section
showPostsView();

// JavaScript for Tab Switching
document.addEventListener('DOMContentLoaded', () => {
    const postsSection = document.getElementById('postsSection');
    const aboutSection = document.getElementById('aboutSection');
    const postsTab = document.getElementById('postsTab');
    const aboutTab = document.getElementById('aboutTab');

    function showPosts() {
        postsSection.style.display = 'block';
        aboutSection.style.display = 'none';
        postsTab.classList.add('active');
        aboutTab.classList.remove('active');
    }

    function showAbout() {
        postsSection.style.display = 'none';
        aboutSection.style.display = 'block';
        postsTab.classList.remove('active');
        aboutTab.classList.add('active');
    }

    // Show the "Posts" section by default
    showPosts();

    postsTab.addEventListener('click', showPosts);
    aboutTab.addEventListener('click', showAbout);
});

// JavaScript for Modal functionality
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
}

function saveInterests() {
    const interestsInput = document.getElementById('interestsInput');
    const interestsList = document.getElementById('interestsList');
    interestsList.innerHTML = '';

    for (const option of interestsInput.options) {
        if (option.selected) {
            const interest = document.createElement('li');
            interest.textContent = option.value;
            interestsList.appendChild(interest);
        }
    }

    closeModal('editInterestsModal');
}

function saveEducation() {
    const educationYearInput = document.getElementById('educationYearInput').value;
    const educationSubjectsInput = document.getElementById('educationSubjectsInput').value;
    const educationAcademicTypeInput = document.getElementById('educationAcademicTypeInput').value;
    const educationGradesInput = document.getElementById('educationGradesInput').value;

    document.getElementById('educationYear').textContent = educationYearInput;
    document.getElementById('educationSubjects').textContent = educationSubjectsInput;
    document.getElementById('educationAcademicType').textContent = educationAcademicTypeInput;
    document.getElementById('educationGrades').textContent = educationGradesInput;

    closeModal('editEducationModal');
}

// Additional JavaScript for your existing functionality can go here...
