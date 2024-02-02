const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <h1 className="text-3xl font font-semibold text-center my-7">
          Welcome to MERN Blog
        </h1>
        <div className="text-md text-gray-500 flex flex-col gap-6">
          <p>
            At MERN Blog, we're passionate about technology. Our platform is
            built on the robust MERN stack – MongoDB, Express.js, React, and
            Node.js – to bring you a seamless and immersive blogging experience.
          </p>
          <p>
            <b>Our Mission</b>
            <br />
            MERN Blog is on a mission to share valuable insights, inspire
            creativity, provide expert advice on MERN Technology. We believe in
            the power of knowledge-sharing, community building, diversity, etc.
          </p>
          <p>
            <b>What Sets Us Apart?</b>
            <br />
            We encourage you to leave comments on our posts and engage with
            other readers. You can like other people's comments and reply to
            them as well. We believe that a community of learners can help each
            other grow and improve.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
